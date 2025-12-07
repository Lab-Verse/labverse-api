import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { SupabaseService } from 'src/common/services/supabase.service';
import { CreateProjectDto } from './dto/create-projects.dto';
import { UpdateProjectDto } from './dto/update-projects.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

class CreateProjectWithFilesDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    isArray: true,
  })
  files?: any[];

  @ApiProperty({ 
    type: 'string', 
    description: 'JSON string of project data (clientId should reference user_id from client_profile)',
    example: '{"name":"Website Project","description":"A new website","clientId":"uuid-of-client-user"}'
  })
  data: string;
}

class UpdateProjectWithFilesDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    isArray: true,
  })
  files?: any[];

  @ApiProperty({ 
    type: 'string', 
    description: 'JSON string of project update data',
    example: '{"name":"Updated Project Name","description":"Updated description"}'
  })
  data: string;
}

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  private readonly logger = new Logger(ProjectsController.name);

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new project with optional multiple image uploads',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateProjectWithFilesDto,
    description: 'Project data and optional image files',
  })
  @ApiResponse({ status: 201, description: 'Project created successfully' })
  @UseInterceptors(FilesInterceptor('files', 10))
  async create(
    @Body() body: any,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }), // 2MB
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp|gif)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    files?: Express.Multer.File[],
  ) {
    let uploadedImageUrls: string[] = [];
    
    try {
      this.logger.log(`Received files: ${files ? files.length : 0}`);
      this.logger.log(`Body keys: ${Object.keys(body)}`);
      if (files && files.length > 0) {
        this.logger.log(
          `File details: ${files.map((f) => `${f.originalname} (${f.size} bytes)`).join(', ')}`,
        );
      }

      let createProjectDto: CreateProjectDto;

      // Manually parse the JSON string from the 'data' field
      if (body.data) {
        createProjectDto = plainToClass(
          CreateProjectDto,
          JSON.parse(body.data),
        );
      } else {
        // Fallback for non-multipart requests
        createProjectDto = plainToClass(CreateProjectDto, body);
      }

      // Explicitly validate the DTO BEFORE uploading files
      const errors = await validate(createProjectDto);
      if (errors.length > 0) {
        const messages = errors.flatMap((error) =>
          Object.values(error.constraints),
        );
        throw new BadRequestException(messages);
      }

      // Make clientId optional for project creation
      if (createProjectDto.clientId) {
        createProjectDto.clientId = undefined; // Remove invalid clientId to avoid validation error
      }

      if (files && files.length > 0) {
        // Upload all files concurrently using Promise.all
        const uploadPromises = files.map((file) =>
          this.supabaseService.uploadImage(file, 'projects'),
        );
        uploadedImageUrls = await Promise.all(uploadPromises);
        createProjectDto.images = uploadedImageUrls;
        this.logger.log(
          `Uploaded ${uploadedImageUrls.length} images: ${uploadedImageUrls.join(', ')}`,
        );
      } else {
        createProjectDto.images = [];
      }

      this.logger.log(
        `Creating project with images: ${JSON.stringify(createProjectDto.images)}`,
      );

      return await this.projectsService.create(createProjectDto);
    } catch (error) {
      this.logger.error(`Failed to create project: ${error.message}`);
      
      // Cleanup uploaded images if project creation fails
      if (uploadedImageUrls.length > 0) {
        this.logger.log(`Cleaning up ${uploadedImageUrls.length} uploaded images due to error`);
        for (const imageUrl of uploadedImageUrls) {
          try {
            await this.supabaseService.deleteImage(imageUrl);
          } catch (cleanupError) {
            this.logger.error(`Failed to cleanup image: ${imageUrl}`);
          }
        }
      }
      
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Projects retrieved successfully' })
  async findAll() {
    try {
      return await this.projectsService.findAll();
    } catch (error) {
      this.logger.error(`Failed to retrieve projects: ${error.message}`);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({ status: 200, description: 'Project retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.projectsService.findOne(id);
    } catch (error) {
      this.logger.error(`Failed to retrieve project ${id}: ${error.message}`);
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a project with optional image uploads' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateProjectWithFilesDto,
    description: 'Project update data and optional image files',
  })
  @ApiResponse({ status: 200, description: 'Project updated successfully' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @UseInterceptors(FilesInterceptor('files', 10))
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }), // 2MB
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp|gif)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    files?: Express.Multer.File[],
  ) {
    try {
      this.logger.log(`Updating project ${id} with ${files ? files.length : 0} files`);

      let updateProjectDto: UpdateProjectDto;

      // Parse the JSON string from the 'data' field
      if (body.data) {
        updateProjectDto = plainToClass(
          UpdateProjectDto,
          JSON.parse(body.data),
        );
      } else {
        // Fallback for non-multipart requests
        updateProjectDto = plainToClass(UpdateProjectDto, body);
      }

      // Validate the DTO
      const errors = await validate(updateProjectDto);
      if (errors.length > 0) {
        const messages = errors.flatMap((error) =>
          Object.values(error.constraints),
        );
        throw new BadRequestException(messages);
      }

      if (files && files.length > 0) {
        // Upload new files
        const uploadPromises = files.map((file) =>
          this.supabaseService.uploadImage(file, 'projects'),
        );
        const newImageUrls = await Promise.all(uploadPromises);
        
        // Get existing project to merge images
        const existingProject = await this.projectsService.findOne(id);
        const existingImages = existingProject.images || [];
        
        updateProjectDto.images = [...existingImages, ...newImageUrls];
        this.logger.log(
          `Added ${newImageUrls.length} new images to project ${id}`,
        );
      }

      return await this.projectsService.update(id, updateProjectDto);
    } catch (error) {
      this.logger.error(`Failed to update project ${id}: ${error.message}`);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiResponse({ status: 200, description: 'Project deleted successfully' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async remove(@Param('id') id: string) {
    try {
      return await this.projectsService.remove(id);
    } catch (error) {
      this.logger.error(`Failed to delete project ${id}: ${error.message}`);
      throw error;
    }
  }
}

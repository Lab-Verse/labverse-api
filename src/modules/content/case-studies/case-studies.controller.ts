import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CaseStudiesService } from './case-studies.service';
import { CreateCaseStudyDto } from './dto/create-case-study.dto';
import { UpdateCaseStudyDto } from './dto/update-case-study.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
@ApiTags('Case Studies')
@Controller('case-studies')
export class CaseStudiesController {
  constructor(private readonly caseStudiesService: CaseStudiesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'projectImages', maxCount: 10 }
    ])
  )
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new case study' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'E-commerce Platform Case Study' },
        slug: { type: 'string', example: 'ecommerce-platform-case-study' },
        introduction: { type: 'string', example: 'Brief introduction to the case study' },
        challenge: { type: 'string', example: 'The main challenge faced by the client' },
        solution: { type: 'string', example: 'Our solution to address the challenge' },
        results: { type: 'string', example: 'The results achieved after implementation' },
        clientName: { type: 'string', example: 'Acme Corporation' },
        categoryId: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' },
        isPublished: { type: 'boolean', example: true },
        thumbnail: {
          type: 'string',
          format: 'binary',
          description: 'Thumbnail image file'
        },
        projectImages: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary'
          },
          description: 'Project images (max 10 files)'
        }
      },
      required: ['title', 'slug', 'challenge', 'solution', 'results']
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new case study',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  create(
    @Body() createCaseStudyDto: CreateCaseStudyDto,
    @UploadedFiles() files: { thumbnail?: Express.Multer.File[], projectImages?: Express.Multer.File[] },
  ) {
    return this.caseStudiesService.create(createCaseStudyDto, files?.projectImages, files?.thumbnail?.[0]);
  }

  @Get()
  @ApiOperation({ summary: 'get all case studies' })
  findAll() {
    return this.caseStudiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific case study by ID' })
  findOne(@Param('id') id: string) {
    return this.caseStudiesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'projectImages', maxCount: 10 }
    ])
  )
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update a specific case study by ID' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Updated Case Study Title' },
        slug: { type: 'string', example: 'updated-case-study-slug' },
        introduction: { type: 'string', example: 'Updated introduction' },
        challenge: { type: 'string', example: 'Updated challenge description' },
        solution: { type: 'string', example: 'Updated solution description' },
        results: { type: 'string', example: 'Updated results description' },
        clientName: { type: 'string', example: 'Updated Client Name' },
        categoryId: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' },
        isPublished: { type: 'boolean', example: true },
        thumbnail: {
          type: 'string',
          format: 'binary',
          description: 'New thumbnail image file'
        },
        projectImages: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary'
          },
          description: 'New project images (max 10 files, will replace existing images)'
        }
      }
    }
  })
  update(
    @Param('id') id: string,
    @Body() updateCaseStudyDto: UpdateCaseStudyDto,
    @UploadedFiles() files: { thumbnail?: Express.Multer.File[], projectImages?: Express.Multer.File[] },
  ) {
    return this.caseStudiesService.update(id, updateCaseStudyDto, files?.projectImages, files?.thumbnail?.[0]);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete a specific case study by ID' })
  remove(@Param('id') id: string) {
    return this.caseStudiesService.remove(id);
  }
}

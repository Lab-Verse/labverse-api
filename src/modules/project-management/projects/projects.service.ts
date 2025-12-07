import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner, DataSource } from 'typeorm';
import { CreateProjectDto } from './dto/create-projects.dto';
import { UpdateProjectDto } from './dto/update-projects.dto';
import { Project } from './entities/projects.entity';
import { Client } from '../../crm/client-profile/entities/clients.entity';
import { User } from '../../users/entities/user.entity';
import { SafeLogger } from '../../../common/utils/logger.util';
import { SupabaseService } from '../../../common/services/supabase.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly dataSource: DataSource,
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validate date logic
      if (createProjectDto.startDate && createProjectDto.endDate) {
        const startDate = new Date(createProjectDto.startDate);
        const endDate = new Date(createProjectDto.endDate);

        if (startDate >= endDate) {
          throw new BadRequestException('Start date must be before end date');
        }
      }

      // Check if project with same name already exists
      const existingProject = await this.projectRepository.findOne({
        where: { name: createProjectDto.name },
      });

      if (existingProject) {
        throw new ConflictException('A project with this name already exists');
      }

      // Validate client exists if clientId is provided (skip validation for now)
      // if (createProjectDto.clientId) {
      //   const client = await this.clientRepository.findOne({
      //     where: { user_id: createProjectDto.clientId },
      //   });
      //   if (!client) {
      //     throw new NotFoundException(`User with ID ${createProjectDto.clientId} not found`);
      //   }
      // }

      // Images are already uploaded and URLs are in createProjectDto.images

      const project = this.projectRepository.create({
        ...createProjectDto,
        startDate: createProjectDto.startDate
          ? new Date(createProjectDto.startDate)
          : null,
        endDate: createProjectDto.endDate
          ? new Date(createProjectDto.endDate)
          : null,
        images: createProjectDto.images || [],
      });

      try {
        const savedProject = await queryRunner.manager.save(Project, project);
        await queryRunner.commitTransaction();

        SafeLogger.log(
          `Project created successfully: ${savedProject.id}`,
          'ProjectsService',
        );
        // Re-fetch the newly created project with its relations to return a complete object.
        // Note: Technologies are associated in a separate service, so this will only show
        // technologies linked *after* this call.
        const projectWithRelations = await this.projectRepository.findOne({
          where: { id: savedProject.id },
          relations: ['projectTechnologies', 'projectTechnologies.technology'],
        });

        return projectWithRelations;
      } catch (dbError) {
        // If database save fails, cleanup uploaded images
        if (createProjectDto.images && createProjectDto.images.length > 0) {
          for (const imageUrl of createProjectDto.images) {
            try {
              await this.supabaseService.deleteImage(imageUrl);
            } catch (cleanupError) {
              SafeLogger.error(
                `Failed to cleanup image: ${imageUrl}`,
                'ProjectsService',
              );
            }
          }
        }
        throw dbError;
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      
      // Cleanup uploaded images if project creation fails
      if (createProjectDto.images && createProjectDto.images.length > 0) {
        SafeLogger.log(`Cleaning up ${createProjectDto.images.length} images due to service error`);
        for (const imageUrl of createProjectDto.images) {
          try {
            await this.supabaseService.deleteImage(imageUrl);
          } catch (cleanupError) {
            SafeLogger.error(
              `Failed to cleanup image: ${imageUrl}`,
              'ProjectsService',
            );
          }
        }
      }
      
      SafeLogger.error(
        `Failed to create project: ${error.message}`,
        'ProjectsService',
      );

      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to create project');
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Retrieve all projects
   */
  async findAll(): Promise<Project[]> {
    try {
      SafeLogger.log('Fetching all projects...', 'ProjectsService');

      const projects = await this.projectRepository.find({
        relations: ['projectTechnologies', 'projectTechnologies.technology'],
        order: { createdAt: 'DESC' },
      });

      SafeLogger.log(
        `Retrieved ${projects.length} projects`,
        'ProjectsService',
      );

      return projects;
    } catch (error) {
      SafeLogger.error(
        `Failed to retrieve projects: ${error.message}`,
        'ProjectsService',
        error.stack,
      );
      throw new InternalServerErrorException('Failed to retrieve projects');
    }
  }

  /**
   * Find a project by ID
   */
  async findOne(id: string): Promise<Project> {
    try {
      if (!id || typeof id !== 'string') {
        throw new BadRequestException('Invalid project ID provided');
      }

      const project = await this.projectRepository.findOne({
        where: { id },
        relations: ['projectTechnologies', 'projectTechnologies.technology'],
      });

      if (!project) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }

      SafeLogger.log(`Project retrieved: ${project.id}`, 'ProjectsService');
      return project;
    } catch (error) {
      SafeLogger.error(
        `Failed to find project ${id}: ${error.message}`,
        'ProjectsService',
      );

      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to retrieve project');
    }
  }

  /**
   * Update a project with validation
   */
  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // First, find the existing project
      const existingProject = await this.findOne(id);

      // Validate date logic if dates are being updated
      const startDate = updateProjectDto.startDate
        ? new Date(updateProjectDto.startDate)
        : existingProject.startDate;
      const endDate = updateProjectDto.endDate
        ? new Date(updateProjectDto.endDate)
        : existingProject.endDate;

      if (startDate && endDate && startDate >= endDate) {
        throw new BadRequestException('Start date must be before end date');
      }

      // Check for name conflicts (if name is being updated)
      if (
        updateProjectDto.name &&
        updateProjectDto.name !== existingProject.name
      ) {
        const nameConflict = await this.projectRepository.findOne({
          where: { name: updateProjectDto.name },
        });

        if (nameConflict) {
          throw new ConflictException(
            'A project with this name already exists',
          );
        }
      }

      // Handle image updates - if new images are provided, they replace old ones
      let imagesToDelete: string[] = [];
      if (updateProjectDto.images !== undefined) {
        const oldImages = existingProject.images || [];
        const newImages = updateProjectDto.images || [];
        
        // Find images that are being removed
        imagesToDelete = oldImages.filter(oldImg => !newImages.includes(oldImg));
      }

      // Prepare update data
      const updateData = {
        ...updateProjectDto,
        startDate: updateProjectDto.startDate
          ? new Date(updateProjectDto.startDate)
          : undefined,
        endDate: updateProjectDto.endDate
          ? new Date(updateProjectDto.endDate)
          : undefined,
      };

      // Update the project
      await queryRunner.manager.update(Project, id, updateData);

      // Delete removed images from Cloudflare R2 after successful DB update
      if (imagesToDelete.length > 0) {
        for (const imageUrl of imagesToDelete) {
          try {
            await this.supabaseService.deleteImage(imageUrl);
            SafeLogger.log(`Deleted image: ${imageUrl}`, 'ProjectsService');
          } catch (cleanupError) {
            SafeLogger.error(
              `Failed to delete image: ${imageUrl} - ${cleanupError.message}`,
              'ProjectsService',
            );
          }
        }
      }

      // Fetch updated project with relations
      const updatedProject = await queryRunner.manager.findOne(Project, {
        where: { id },
        relations: ['projectTechnologies', 'projectTechnologies.technology'],
      });

      await queryRunner.commitTransaction();

      SafeLogger.log(`Project updated successfully: ${id}`, 'ProjectsService');
      return updatedProject;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      SafeLogger.error(
        `Failed to update project ${id}: ${error.message}`,
        'ProjectsService',
      );

      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update project');
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Delete a project with proper cleanup
   */
  async remove(id: string): Promise<{ success: boolean; message: string }> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // First, check if project exists and get its images
      const project = await this.findOne(id);
      const imagesToDelete = project.images || [];

      // Delete the project
      const deleteResult = await queryRunner.manager.delete(Project, id);

      if (deleteResult.affected === 0) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }

      await queryRunner.commitTransaction();

      // Delete all project images from Cloudflare R2 after successful DB deletion
      if (imagesToDelete.length > 0) {
        for (const imageUrl of imagesToDelete) {
          try {
            await this.supabaseService.deleteImage(imageUrl);
            SafeLogger.log(`Deleted image: ${imageUrl}`, 'ProjectsService');
          } catch (cleanupError) {
            SafeLogger.error(
              `Failed to delete image: ${imageUrl} - ${cleanupError.message}`,
              'ProjectsService',
            );
          }
        }
      }

      SafeLogger.log(`Project deleted successfully: ${id}`, 'ProjectsService');
      return {
        success: true,
        message: 'Project deleted successfully',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      SafeLogger.error(
        `Failed to delete project ${id}: ${error.message}`,
        'ProjectsService',
      );

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete project');
    } finally {
      await queryRunner.release();
    }
  }
}

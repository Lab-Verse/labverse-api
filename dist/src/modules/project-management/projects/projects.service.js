"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const projects_entity_1 = require("./entities/projects.entity");
const clients_entity_1 = require("../../crm/clients/entities/clients.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const logger_util_1 = require("../../../common/utils/logger.util");
const supabase_service_1 = require("../../../common/services/supabase.service");
let ProjectsService = class ProjectsService {
    constructor(projectRepository, clientRepository, userRepository, dataSource, supabaseService) {
        this.projectRepository = projectRepository;
        this.clientRepository = clientRepository;
        this.userRepository = userRepository;
        this.dataSource = dataSource;
        this.supabaseService = supabaseService;
    }
    async create(createProjectDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (createProjectDto.startDate && createProjectDto.endDate) {
                const startDate = new Date(createProjectDto.startDate);
                const endDate = new Date(createProjectDto.endDate);
                if (startDate >= endDate) {
                    throw new common_1.BadRequestException('Start date must be before end date');
                }
            }
            const existingProject = await this.projectRepository.findOne({
                where: { name: createProjectDto.name },
            });
            if (existingProject) {
                throw new common_1.ConflictException('A project with this name already exists');
            }
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
                const savedProject = await queryRunner.manager.save(projects_entity_1.Project, project);
                await queryRunner.commitTransaction();
                logger_util_1.SafeLogger.log(`Project created successfully: ${savedProject.id}`, 'ProjectsService');
                const projectWithRelations = await this.projectRepository.findOne({
                    where: { id: savedProject.id },
                    relations: ['projectTechnologies', 'projectTechnologies.technology'],
                });
                return projectWithRelations;
            }
            catch (dbError) {
                if (createProjectDto.images && createProjectDto.images.length > 0) {
                    for (const imageUrl of createProjectDto.images) {
                        try {
                            await this.supabaseService.deleteImage(imageUrl);
                        }
                        catch (cleanupError) {
                            logger_util_1.SafeLogger.error(`Failed to cleanup image: ${imageUrl}`, 'ProjectsService');
                        }
                    }
                }
                throw dbError;
            }
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            logger_util_1.SafeLogger.error(`Failed to create project: ${error.message}`, 'ProjectsService');
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to create project');
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll() {
        try {
            logger_util_1.SafeLogger.log('Fetching all projects...', 'ProjectsService');
            const projects = await this.projectRepository.find({
                relations: ['projectTechnologies', 'projectTechnologies.technology'],
                order: { createdAt: 'DESC' },
            });
            logger_util_1.SafeLogger.log(`Retrieved ${projects.length} projects`, 'ProjectsService');
            return projects;
        }
        catch (error) {
            logger_util_1.SafeLogger.error(`Failed to retrieve projects: ${error.message}`, 'ProjectsService', error.stack);
            throw new common_1.InternalServerErrorException('Failed to retrieve projects');
        }
    }
    async findOne(id) {
        try {
            if (!id || typeof id !== 'string') {
                throw new common_1.BadRequestException('Invalid project ID provided');
            }
            const project = await this.projectRepository.findOne({
                where: { id },
                relations: ['projectTechnologies', 'projectTechnologies.technology'],
            });
            if (!project) {
                throw new common_1.NotFoundException(`Project with ID ${id} not found`);
            }
            logger_util_1.SafeLogger.log(`Project retrieved: ${project.id}`, 'ProjectsService');
            return project;
        }
        catch (error) {
            logger_util_1.SafeLogger.error(`Failed to find project ${id}: ${error.message}`, 'ProjectsService');
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to retrieve project');
        }
    }
    async update(id, updateProjectDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const existingProject = await this.findOne(id);
            const startDate = updateProjectDto.startDate
                ? new Date(updateProjectDto.startDate)
                : existingProject.startDate;
            const endDate = updateProjectDto.endDate
                ? new Date(updateProjectDto.endDate)
                : existingProject.endDate;
            if (startDate && endDate && startDate >= endDate) {
                throw new common_1.BadRequestException('Start date must be before end date');
            }
            if (updateProjectDto.name &&
                updateProjectDto.name !== existingProject.name) {
                const nameConflict = await this.projectRepository.findOne({
                    where: { name: updateProjectDto.name },
                });
                if (nameConflict) {
                    throw new common_1.ConflictException('A project with this name already exists');
                }
            }
            const updateData = {
                ...updateProjectDto,
                startDate: updateProjectDto.startDate
                    ? new Date(updateProjectDto.startDate)
                    : undefined,
                endDate: updateProjectDto.endDate
                    ? new Date(updateProjectDto.endDate)
                    : undefined,
            };
            await queryRunner.manager.update(projects_entity_1.Project, id, updateData);
            const updatedProject = await queryRunner.manager.findOne(projects_entity_1.Project, {
                where: { id },
                relations: ['projectTechnologies', 'projectTechnologies.technology'],
            });
            await queryRunner.commitTransaction();
            logger_util_1.SafeLogger.log(`Project updated successfully: ${id}`, 'ProjectsService');
            return updatedProject;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            logger_util_1.SafeLogger.error(`Failed to update project ${id}: ${error.message}`, 'ProjectsService');
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException ||
                error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to update project');
        }
        finally {
            await queryRunner.release();
        }
    }
    async remove(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const project = await this.findOne(id);
            const deleteResult = await queryRunner.manager.delete(projects_entity_1.Project, id);
            if (deleteResult.affected === 0) {
                throw new common_1.NotFoundException(`Project with ID ${id} not found`);
            }
            await queryRunner.commitTransaction();
            logger_util_1.SafeLogger.log(`Project deleted successfully: ${id}`, 'ProjectsService');
            return {
                success: true,
                message: 'Project deleted successfully',
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            logger_util_1.SafeLogger.error(`Failed to delete project ${id}: ${error.message}`, 'ProjectsService');
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to delete project');
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(projects_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(clients_entity_1.Client)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        supabase_service_1.SupabaseService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map
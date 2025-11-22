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
exports.ProjectTechnologiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_technology_entity_1 = require("./entities/project-technology.entity");
const projects_entity_1 = require("../projects/entities/projects.entity");
const technology_entity_1 = require("../../technology/entities/technology.entity");
const security_util_1 = require("../../../common/utils/security.util");
const typeorm_3 = require("typeorm");
let ProjectTechnologiesService = class ProjectTechnologiesService {
    constructor(projectTechnologyRepository, projectRepository, technologyRepository, dataSource) {
        this.projectTechnologyRepository = projectTechnologyRepository;
        this.projectRepository = projectRepository;
        this.technologyRepository = technologyRepository;
        this.dataSource = dataSource;
    }
    async create(dto) {
        security_util_1.SecurityUtil.validateObject(dto);
        const { projectId, technologyIds } = dto;
        if (!projectId || technologyIds.length === 0) {
            throw new common_1.BadRequestException('Project ID and at least one Technology ID are required.');
        }
        const validProjectId = security_util_1.SecurityUtil.validateId(projectId);
        const validTechnologyIds = technologyIds.map((id) => security_util_1.SecurityUtil.validateId(id));
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const project = await queryRunner.manager.findOne(projects_entity_1.Project, {
                where: { id: validProjectId },
            });
            if (!project) {
                throw new common_1.NotFoundException(`Project with ID "${projectId}" not found.`);
            }
            const technologies = await queryRunner.manager.find(technology_entity_1.Technology, {
                where: validTechnologyIds.map((id) => ({ id })),
            });
            if (technologies.length !== validTechnologyIds.length) {
                throw new common_1.NotFoundException('One or more technologies were not found.');
            }
            const existingAssociations = await queryRunner.manager.find(project_technology_entity_1.ProjectTechnology, {
                where: {
                    projectId: validProjectId,
                    technologyId: (0, typeorm_2.In)(validTechnologyIds),
                },
            });
            if (existingAssociations.length > 0) {
                const existingMessage = existingAssociations
                    .map((assoc) => `(Technology ID: ${assoc.technologyId})`)
                    .join(', ');
                throw new common_1.ConflictException(`One or more project-technology associations already exist for this project: ${existingMessage}`);
            }
            const newAssociations = validTechnologyIds.map((techId) => this.projectTechnologyRepository.create({
                projectId: validProjectId,
                technologyId: techId,
            }));
            const savedAssociations = await queryRunner.manager.save(newAssociations);
            await queryRunner.commitTransaction();
            return savedAssociations;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async update(projectId, oldTechnologyId, dto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const validProjectId = security_util_1.SecurityUtil.validateId(projectId);
            const validOldTechnologyId = security_util_1.SecurityUtil.validateId(oldTechnologyId);
            const validNewTechnologyId = security_util_1.SecurityUtil.validateId(dto.newTechnologyId);
            const existingAssociation = await queryRunner.manager.findOne(project_technology_entity_1.ProjectTechnology, {
                where: {
                    projectId: validProjectId,
                    technologyId: validOldTechnologyId,
                },
            });
            if (!existingAssociation) {
                throw new common_1.NotFoundException('Project technology association not found.');
            }
            const newTechnology = await queryRunner.manager.findOne(technology_entity_1.Technology, {
                where: { id: validNewTechnologyId },
            });
            if (!newTechnology) {
                throw new common_1.NotFoundException('New technology not found.');
            }
            const conflictAssociation = await queryRunner.manager.findOne(project_technology_entity_1.ProjectTechnology, {
                where: {
                    projectId: validProjectId,
                    technologyId: validNewTechnologyId,
                },
            });
            if (conflictAssociation) {
                throw new common_1.ConflictException('A project technology association with the new technology already exists.');
            }
            await queryRunner.manager.remove(existingAssociation);
            const newAssociation = this.projectTechnologyRepository.create({
                projectId: validProjectId,
                technologyId: validNewTechnologyId,
            });
            const savedAssociation = await queryRunner.manager.save(newAssociation);
            await queryRunner.commitTransaction();
            return savedAssociation;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll() {
        return this.projectTechnologyRepository.find({
            relations: ['project', 'technology'],
        });
    }
    async findOne(projectId, technologyId) {
        const validProjectId = security_util_1.SecurityUtil.validateId(projectId);
        const validTechnologyId = security_util_1.SecurityUtil.validateId(technologyId);
        const projectTechnology = await this.projectTechnologyRepository.findOne({
            where: { projectId: validProjectId, technologyId: validTechnologyId },
            relations: ['project', 'technology'],
        });
        if (!projectTechnology) {
            throw new common_1.NotFoundException(`ProjectTechnology association not found for Project ID "${projectId}" and Technology ID "${technologyId}".`);
        }
        return projectTechnology;
    }
    async remove(projectId, technologyId) {
        const validProjectId = security_util_1.SecurityUtil.validateId(projectId);
        const validTechnologyId = security_util_1.SecurityUtil.validateId(technologyId);
        const result = await this.projectTechnologyRepository.delete({
            projectId: validProjectId,
            technologyId: validTechnologyId,
        });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`ProjectTechnology association not found for Project ID "${projectId}" and Technology ID "${technologyId}".`);
        }
    }
};
exports.ProjectTechnologiesService = ProjectTechnologiesService;
exports.ProjectTechnologiesService = ProjectTechnologiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_technology_entity_1.ProjectTechnology)),
    __param(1, (0, typeorm_1.InjectRepository)(projects_entity_1.Project)),
    __param(2, (0, typeorm_1.InjectRepository)(technology_entity_1.Technology)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_3.DataSource])
], ProjectTechnologiesService);
//# sourceMappingURL=project-technology.service.js.map
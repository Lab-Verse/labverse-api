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
var ProjectsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const projects_service_1 = require("./projects.service");
const supabase_service_1 = require("../../../common/services/supabase.service");
const create_projects_dto_1 = require("./dto/create-projects.dto");
const update_projects_dto_1 = require("./dto/update-projects.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateProjectWithFilesDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'binary',
        required: false,
        isArray: true,
    }),
    __metadata("design:type", Array)
], CreateProjectWithFilesDto.prototype, "files", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', description: 'JSON string of project data' }),
    __metadata("design:type", String)
], CreateProjectWithFilesDto.prototype, "data", void 0);
let ProjectsController = ProjectsController_1 = class ProjectsController {
    constructor(projectsService, supabaseService) {
        this.projectsService = projectsService;
        this.supabaseService = supabaseService;
        this.logger = new common_1.Logger(ProjectsController_1.name);
    }
    async create(body, files) {
        try {
            this.logger.log(`Received files: ${files ? files.length : 0}`);
            this.logger.log(`Body keys: ${Object.keys(body)}`);
            if (files && files.length > 0) {
                this.logger.log(`File details: ${files.map((f) => `${f.originalname} (${f.size} bytes)`).join(', ')}`);
            }
            let createProjectDto;
            if (body.data) {
                createProjectDto = (0, class_transformer_1.plainToClass)(create_projects_dto_1.CreateProjectDto, JSON.parse(body.data));
            }
            else {
                createProjectDto = (0, class_transformer_1.plainToClass)(create_projects_dto_1.CreateProjectDto, body);
            }
            const errors = await (0, class_validator_1.validate)(createProjectDto);
            if (errors.length > 0) {
                const messages = errors.flatMap((error) => Object.values(error.constraints));
                throw new common_1.BadRequestException(messages);
            }
            if (files && files.length > 0) {
                const uploadPromises = files.map((file) => this.supabaseService.uploadImage(file, 'projects'));
                const imageUrls = await Promise.all(uploadPromises);
                createProjectDto.images = imageUrls;
                this.logger.log(`Uploaded ${imageUrls.length} images: ${imageUrls.join(', ')}`);
            }
            else {
                createProjectDto.images = [];
            }
            this.logger.log(`Creating project with images: ${JSON.stringify(createProjectDto.images)}`);
            return await this.projectsService.create(createProjectDto);
        }
        catch (error) {
            this.logger.error(`Failed to create project: ${error.message}`);
            throw error;
        }
    }
    async findAll() {
        try {
            return await this.projectsService.findAll();
        }
        catch (error) {
            this.logger.error(`Failed to retrieve projects: ${error.message}`);
            throw error;
        }
    }
    async findOne(id) {
        try {
            return await this.projectsService.findOne(id);
        }
        catch (error) {
            this.logger.error(`Failed to retrieve project ${id}: ${error.message}`);
            throw error;
        }
    }
    async update(id, updateProjectDto) {
        try {
            return await this.projectsService.update(id, updateProjectDto);
        }
        catch (error) {
            this.logger.error(`Failed to update project ${id}: ${error.message}`);
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.projectsService.remove(id);
        }
        catch (error) {
            this.logger.error(`Failed to delete project ${id}: ${error.message}`);
            throw error;
        }
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new project with optional multiple image uploads',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        type: CreateProjectWithFilesDto,
        description: 'Project data and optional image files',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Project created successfully' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: /^image\/(jpeg|png|webp|gif)$/ }),
        ],
        fileIsRequired: false,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all projects' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Projects retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get project by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Project retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Project not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a project' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Project updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Project not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_projects_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a project' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Project deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Project not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "remove", null);
exports.ProjectsController = ProjectsController = ProjectsController_1 = __decorate([
    (0, swagger_1.ApiTags)('projects'),
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService,
        supabase_service_1.SupabaseService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map
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
exports.ProjectTechnologiesController = void 0;
const common_1 = require("@nestjs/common");
const project_technology_service_1 = require("./project-technology.service");
const create_project_technology_dto_1 = require("./dto/create-project-technology.dto");
const update_project_technology_dto_1 = require("./dto/update-project-technology.dto");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const role_enum_1 = require("../../roles/role.enum");
let ProjectTechnologiesController = class ProjectTechnologiesController {
    constructor(projectTechnologiesService) {
        this.projectTechnologiesService = projectTechnologiesService;
    }
    create(createProjectTechnologiesDto) {
        return this.projectTechnologiesService.create(createProjectTechnologiesDto);
    }
    update(projectId, oldTechnologyId, dto) {
        return this.projectTechnologiesService.update(projectId, oldTechnologyId, dto);
    }
    findAll() {
        return this.projectTechnologiesService.findAll();
    }
    findOne(projectId, technologyId) {
        return this.projectTechnologiesService.findOne(projectId, technologyId);
    }
    remove(projectId, technologyId) {
        return this.projectTechnologiesService.remove(projectId, technologyId);
    }
};
exports.ProjectTechnologiesController = ProjectTechnologiesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new project technology association (bulk)',
    }),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.PROJECT_MANAGER, role_enum_1.RoleEnum.DEVELOPER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_technology_dto_1.CreateProjectTechnologiesDto]),
    __metadata("design:returntype", void 0)
], ProjectTechnologiesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':projectId/:oldTechnologyId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a project technology association' }),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.PROJECT_MANAGER, role_enum_1.RoleEnum.DEVELOPER),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('oldTechnologyId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_project_technology_dto_1.UpdateProjectTechnologyDto]),
    __metadata("design:returntype", void 0)
], ProjectTechnologiesController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all project technology associations' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectTechnologiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':projectId/:technologyId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a project technology association by IDs' }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('technologyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectTechnologiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':projectId/:technologyId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a project technology association by IDs' }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('technologyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectTechnologiesController.prototype, "remove", null);
exports.ProjectTechnologiesController = ProjectTechnologiesController = __decorate([
    (0, swagger_1.ApiTags)('Project Technologies'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('project-technologies'),
    __metadata("design:paramtypes", [project_technology_service_1.ProjectTechnologiesService])
], ProjectTechnologiesController);
//# sourceMappingURL=project-technology.controller.js.map
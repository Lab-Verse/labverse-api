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
exports.PermissionsController = void 0;
const common_1 = require("@nestjs/common");
const permissions_service_1 = require("./permissions.service");
const create_permission_dto_1 = require("./dto/create-permission.dto");
const update_permission_dto_1 = require("./dto/update-permission.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const permissions_guard_1 = require("../../common/guards/permissions.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const role_enum_1 = require("../roles/role.enum");
const security_util_1 = require("../../common/utils/security.util");
const swagger_1 = require("@nestjs/swagger");
let PermissionsController = class PermissionsController {
    constructor(permissionsService) {
        this.permissionsService = permissionsService;
    }
    create(dto) {
        return this.permissionsService.create(dto);
    }
    findAll() {
        return this.permissionsService.findAll();
    }
    getAllResources() {
        return this.permissionsService.getAllResources();
    }
    getAllActions() {
        return this.permissionsService.getAllActions();
    }
    findByResource(resource) {
        return this.permissionsService.findByResource(resource);
    }
    findOne(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        return this.permissionsService.findOne(validId);
    }
    update(id, dto) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        return this.permissionsService.update(validId, dto);
    }
    remove(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        return this.permissionsService.remove(validId);
    }
};
exports.PermissionsController = PermissionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new permission' }),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN),
    (0, permissions_decorator_1.Permissions)('permissions.create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permission_dto_1.CreatePermissionDto]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, permissions_decorator_1.Permissions)('permissions.read'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all permissions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('resources'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all resources' }),
    (0, permissions_decorator_1.Permissions)('permissions.read'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "getAllResources", null);
__decorate([
    (0, common_1.Get)('actions'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all actions' }),
    (0, permissions_decorator_1.Permissions)('permissions.read'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "getAllActions", null);
__decorate([
    (0, common_1.Get)('by-resource'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, permissions_decorator_1.Permissions)('permissions.read'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all permissions by resource' }),
    __param(0, (0, common_1.Query)('resource')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "findByResource", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, permissions_decorator_1.Permissions)('permissions.read'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a specific permission' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, permissions_decorator_1.Permissions)('permission.update'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a specific permission' }),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_permission_dto_1.UpdatePermissionDto]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, permissions_decorator_1.Permissions)('permissions.delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a specific permission' }),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "remove", null);
exports.PermissionsController = PermissionsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard),
    (0, swagger_1.ApiTags)('permissions'),
    (0, common_1.Controller)('permissions'),
    __metadata("design:paramtypes", [permissions_service_1.PermissionsService])
], PermissionsController);
//# sourceMappingURL=permissions.controller.js.map
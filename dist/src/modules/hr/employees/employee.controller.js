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
exports.EmployeeProfilesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const employee_service_1 = require("./employee.service");
const create_employee_dto_1 = require("./dto/create-employee.dto");
const update_employee_dto_1 = require("./dto/update-employee.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const role_enum_1 = require("../../roles/role.enum");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const uuid_validation_pipe_1 = require("../../../common/pipes/uuid-validation.pipe");
const security_util_1 = require("../../../common/utils/security.util");
const swagger_1 = require("@nestjs/swagger");
let EmployeeProfilesController = class EmployeeProfilesController {
    constructor(employeeProfilesService) {
        this.employeeProfilesService = employeeProfilesService;
    }
    create(createEmployeeProfileDto, file) {
        return this.employeeProfilesService.create(createEmployeeProfileDto, file);
    }
    findAll() {
        return this.employeeProfilesService.findAll();
    }
    findOne(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        return this.employeeProfilesService.findOne(validId);
    }
    update(id, updateEmployeeProfileDto) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        return this.employeeProfilesService.update(validId, updateEmployeeProfileDto);
    }
    remove(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        return this.employeeProfilesService.remove(validId);
    }
    async uploadProfileImage(id, file) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        return this.employeeProfilesService.uploadProfileImage(validId, file);
    }
};
exports.EmployeeProfilesController = EmployeeProfilesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new employee profile with an optional image',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'string', format: 'uuid' },
                hireDate: { type: 'string', format: 'date' },
                jobTitle: { type: 'string' },
                department: { type: 'string' },
                status: {
                    type: 'string',
                    enum: ['active', 'inactive', 'on_leave', 'terminated'],
                },
                file: { type: 'string', format: 'binary' },
            },
            required: ['userId'],
        },
    }),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_dto_1.CreateEmployeeProfileDto, Object]),
    __metadata("design:returntype", void 0)
], EmployeeProfilesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all employee profiles' }),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.PROJECT_MANAGER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployeeProfilesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a specific employee profile' }),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.PROJECT_MANAGER, role_enum_1.RoleEnum.EMPLOYEE),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UuidValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeProfilesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a specific employee profile' }),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UuidValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_employee_dto_1.UpdateEmployeeProfileDto]),
    __metadata("design:returntype", void 0)
], EmployeeProfilesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a specific employee profile' }),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UuidValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeProfilesController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/image'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload or update a profile image for an employee' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Profile image to upload',
        type: 'multipart/form-data',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.EMPLOYEE),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UuidValidationPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeProfilesController.prototype, "uploadProfileImage", null);
exports.EmployeeProfilesController = EmployeeProfilesController = __decorate([
    (0, swagger_1.ApiTags)('Employee Profiles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('employee-profiles'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeProfilesService])
], EmployeeProfilesController);
//# sourceMappingURL=employee.controller.js.map
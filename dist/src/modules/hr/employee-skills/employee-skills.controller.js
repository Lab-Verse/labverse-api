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
exports.EmployeeSkillsController = void 0;
const common_1 = require("@nestjs/common");
const employee_skills_service_1 = require("./employee-skills.service");
const create_employee_skill_dto_1 = require("./dto/create-employee-skill.dto");
const update_employee_skill_dto_1 = require("./dto/update-employee-skill.dto");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let EmployeeSkillsController = class EmployeeSkillsController {
    constructor(employeeSkillsService) {
        this.employeeSkillsService = employeeSkillsService;
    }
    create(createEmployeeSkillDto) {
        return this.employeeSkillsService.create(createEmployeeSkillDto);
    }
    findAll() {
        return this.employeeSkillsService.findAll();
    }
    findByEmployee(employeeId) {
        return this.employeeSkillsService.findByEmployee(employeeId);
    }
    findOne(employeeId, skillId) {
        return this.employeeSkillsService.findOne(employeeId, skillId);
    }
    update(employeeId, skillId, updateEmployeeSkillDto) {
        return this.employeeSkillsService.update(employeeId, skillId, updateEmployeeSkillDto);
    }
    remove(employeeId, skillId) {
        return this.employeeSkillsService.remove(employeeId, skillId);
    }
};
exports.EmployeeSkillsController = EmployeeSkillsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new employee skill' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_skill_dto_1.CreateEmployeeSkillDto]),
    __metadata("design:returntype", void 0)
], EmployeeSkillsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all employee skills' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployeeSkillsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('employee/:employeeId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve all employee skills for a specific employee',
    }),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeSkillsController.prototype, "findByEmployee", null);
__decorate([
    (0, common_1.Get)(':employeeId/:skillId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a specific employee skill' }),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Param)('skillId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EmployeeSkillsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':employeeId/:skillId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a specific employee skill' }),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Param)('skillId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_employee_skill_dto_1.UpdateEmployeeSkillDto]),
    __metadata("design:returntype", void 0)
], EmployeeSkillsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':employeeId/:skillId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a specific employee skill' }),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Param)('skillId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EmployeeSkillsController.prototype, "remove", null);
exports.EmployeeSkillsController = EmployeeSkillsController = __decorate([
    (0, swagger_1.ApiTags)('Employee Skills'),
    (0, common_1.Controller)('employee-skills'),
    __metadata("design:paramtypes", [employee_skills_service_1.EmployeeSkillsService])
], EmployeeSkillsController);
//# sourceMappingURL=employee-skills.controller.js.map
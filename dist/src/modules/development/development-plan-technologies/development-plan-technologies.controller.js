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
exports.DevelopmentPlanTechnologiesController = void 0;
const common_1 = require("@nestjs/common");
const development_plan_technologies_service_1 = require("./development-plan-technologies.service");
const create_development_plan_technology_dto_1 = require("./dto/create-development-plan-technology.dto");
const update_development_plan_technology_dto_1 = require("./dto/update-development-plan-technology.dto");
const swagger_1 = require("@nestjs/swagger");
const security_util_1 = require("../../../common/utils/security.util");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let DevelopmentPlanTechnologiesController = class DevelopmentPlanTechnologiesController {
    constructor(dptService) {
        this.dptService = dptService;
    }
    async create(createDptDto) {
        security_util_1.SecurityUtil.validateObject(createDptDto);
        return this.dptService.create(createDptDto);
    }
    async findAll() {
        return this.dptService.findAll();
    }
    async findOne(id) {
        return this.dptService.findOne(id);
    }
    async update(id, updateDptDto) {
        return this.dptService.update(id, updateDptDto);
    }
    async remove(id) {
        return this.dptService.remove(id);
    }
};
exports.DevelopmentPlanTechnologiesController = DevelopmentPlanTechnologiesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Associate a technology with a development plan' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Association created.',
        type: create_development_plan_technology_dto_1.CreateDevelopmentPlanTechnologyDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_development_plan_technology_dto_1.CreateDevelopmentPlanTechnologyDto]),
    __metadata("design:returntype", Promise)
], DevelopmentPlanTechnologiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve all development plan technology associations',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved all associations.',
        type: [create_development_plan_technology_dto_1.CreateDevelopmentPlanTechnologyDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DevelopmentPlanTechnologiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve a development plan technology association by ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Association found.',
        type: create_development_plan_technology_dto_1.CreateDevelopmentPlanTechnologyDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Association not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DevelopmentPlanTechnologiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a development plan technology association' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The association has been successfully updated.',
        type: create_development_plan_technology_dto_1.CreateDevelopmentPlanTechnologyDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Association not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_development_plan_technology_dto_1.UpdateDevelopmentPlanTechnologyDto]),
    __metadata("design:returntype", Promise)
], DevelopmentPlanTechnologiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a development plan technology association' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'The association has been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Association not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DevelopmentPlanTechnologiesController.prototype, "remove", null);
exports.DevelopmentPlanTechnologiesController = DevelopmentPlanTechnologiesController = __decorate([
    (0, swagger_1.ApiTags)('development-plan-technologies'),
    (0, common_1.Controller)('development-plan-technologies'),
    __metadata("design:paramtypes", [development_plan_technologies_service_1.DevelopmentPlanTechnologiesService])
], DevelopmentPlanTechnologiesController);
//# sourceMappingURL=development-plan-technologies.controller.js.map
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
exports.DevelopmentPlanServicesController = void 0;
const common_1 = require("@nestjs/common");
const development_plan_services_service_1 = require("./development-plan-services.service");
const create_development_plan_service_dto_1 = require("./dto/create-development-plan-service.dto");
const update_development_plan_service_dto_1 = require("./dto/update-development-plan-service.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let DevelopmentPlanServicesController = class DevelopmentPlanServicesController {
    constructor(dpsService) {
        this.dpsService = dpsService;
    }
    async create(createDpsDto) {
        return this.dpsService.create(createDpsDto);
    }
    async findAll() {
        return this.dpsService.findAll();
    }
    async findOne(id) {
        return this.dpsService.findOne(id);
    }
    async update(id, updateDpsDto) {
        return this.dpsService.update(id, updateDpsDto);
    }
    async remove(id) {
        await this.dpsService.remove(id);
    }
};
exports.DevelopmentPlanServicesController = DevelopmentPlanServicesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Associate a service with a development plan' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Association created.',
        type: create_development_plan_service_dto_1.CreateDevelopmentPlanServiceDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_development_plan_service_dto_1.CreateDevelopmentPlanServiceDto]),
    __metadata("design:returntype", Promise)
], DevelopmentPlanServicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve all development plan service associations',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved all associations.',
        type: [create_development_plan_service_dto_1.CreateDevelopmentPlanServiceDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DevelopmentPlanServicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve a development plan service association by ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Association found.',
        type: create_development_plan_service_dto_1.CreateDevelopmentPlanServiceDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Association not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DevelopmentPlanServicesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a development plan service association' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The association has been successfully updated.',
        type: create_development_plan_service_dto_1.CreateDevelopmentPlanServiceDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Association not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_development_plan_service_dto_1.UpdateDevelopmentPlanServiceDto]),
    __metadata("design:returntype", Promise)
], DevelopmentPlanServicesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a development plan service association' }),
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
], DevelopmentPlanServicesController.prototype, "remove", null);
exports.DevelopmentPlanServicesController = DevelopmentPlanServicesController = __decorate([
    (0, swagger_1.ApiTags)('development-plan-services'),
    (0, common_1.Controller)('development-plan-services'),
    __metadata("design:paramtypes", [development_plan_services_service_1.DevelopmentPlanServicesService])
], DevelopmentPlanServicesController);
//# sourceMappingURL=development-plan-services.controller.js.map
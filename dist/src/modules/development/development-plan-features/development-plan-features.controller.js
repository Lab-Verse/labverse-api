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
exports.DevelopmentPlanFeaturesController = void 0;
const common_1 = require("@nestjs/common");
const development_plan_features_service_1 = require("./development-plan-features.service");
const create_development_plan_feature_dto_1 = require("./dto/create-development-plan-feature.dto");
const update_development_plan_feature_dto_1 = require("./dto/update-development-plan-feature.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let DevelopmentPlanFeaturesController = class DevelopmentPlanFeaturesController {
    constructor(dpfService) {
        this.dpfService = dpfService;
    }
    async create(createDpfDto) {
        return this.dpfService.create(createDpfDto);
    }
    async findAll() {
        return this.dpfService.findAll();
    }
    async findOne(id) {
        return this.dpfService.findOne(id);
    }
    async update(id, updateDpfDto) {
        return this.dpfService.update(id, updateDpfDto);
    }
    async remove(id) {
        await this.dpfService.remove(id);
    }
};
exports.DevelopmentPlanFeaturesController = DevelopmentPlanFeaturesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Associate a feature with a development plan' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Association created.',
        type: create_development_plan_feature_dto_1.CreateDevelopmentPlanFeatureDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_development_plan_feature_dto_1.CreateDevelopmentPlanFeatureDto]),
    __metadata("design:returntype", Promise)
], DevelopmentPlanFeaturesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve all development plan feature associations',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved all associations.',
        type: [create_development_plan_feature_dto_1.CreateDevelopmentPlanFeatureDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DevelopmentPlanFeaturesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve a development plan feature association by ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Association found.',
        type: create_development_plan_feature_dto_1.CreateDevelopmentPlanFeatureDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Association not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DevelopmentPlanFeaturesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a development plan feature association' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The association has been successfully updated.',
        type: create_development_plan_feature_dto_1.CreateDevelopmentPlanFeatureDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Association not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_development_plan_feature_dto_1.UpdateDevelopmentPlanFeatureDto]),
    __metadata("design:returntype", Promise)
], DevelopmentPlanFeaturesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a development plan feature association' }),
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
], DevelopmentPlanFeaturesController.prototype, "remove", null);
exports.DevelopmentPlanFeaturesController = DevelopmentPlanFeaturesController = __decorate([
    (0, swagger_1.ApiTags)('development-plan-features'),
    (0, common_1.Controller)('development-plan-features'),
    __metadata("design:paramtypes", [development_plan_features_service_1.DevelopmentPlanFeaturesService])
], DevelopmentPlanFeaturesController);
//# sourceMappingURL=development-plan-features.controller.js.map
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
exports.DevelopmentPlansController = void 0;
const common_1 = require("@nestjs/common");
const development_plans_service_1 = require("./development-plans.service");
const create_development_plan_dto_1 = require("./dto/create-development-plan.dto");
const update_development_plan_dto_1 = require("./dto/update-development-plan.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let DevelopmentPlansController = class DevelopmentPlansController {
    constructor(developmentPlansService) {
        this.developmentPlansService = developmentPlansService;
    }
    async create(createDevelopmentPlanDto) {
        return this.developmentPlansService.create(createDevelopmentPlanDto);
    }
    async findAll() {
        return this.developmentPlansService.findAll();
    }
    async findOne(id) {
        return this.developmentPlansService.findOne(id);
    }
    async update(id, updateDevelopmentPlanDto) {
        return this.developmentPlansService.update(id, updateDevelopmentPlanDto);
    }
    async remove(id) {
        await this.developmentPlansService.remove(id);
    }
};
exports.DevelopmentPlansController = DevelopmentPlansController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new development plan' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The development plan has been successfully created.',
        type: create_development_plan_dto_1.CreateDevelopmentPlanDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_development_plan_dto_1.CreateDevelopmentPlanDto]),
    __metadata("design:returntype", Promise)
], DevelopmentPlansController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all development plans' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved all development plans.',
        type: [create_development_plan_dto_1.CreateDevelopmentPlanDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DevelopmentPlansController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a development plan by ID' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Development plan found.',
        type: create_development_plan_dto_1.CreateDevelopmentPlanDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Development plan not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DevelopmentPlansController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing development plan' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The development plan has been successfully updated.',
        type: create_development_plan_dto_1.CreateDevelopmentPlanDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Development plan not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_development_plan_dto_1.UpdateDevelopmentPlanDto]),
    __metadata("design:returntype", Promise)
], DevelopmentPlansController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a development plan' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'The development plan has been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Development plan not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DevelopmentPlansController.prototype, "remove", null);
exports.DevelopmentPlansController = DevelopmentPlansController = __decorate([
    (0, swagger_1.ApiTags)('development-plans'),
    (0, common_1.Controller)('development-plans'),
    __metadata("design:paramtypes", [development_plans_service_1.DevelopmentPlansService])
], DevelopmentPlansController);
//# sourceMappingURL=development-plans.controller.js.map
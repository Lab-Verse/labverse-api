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
exports.ClientPlanQuotationsController = void 0;
const common_1 = require("@nestjs/common");
const client_plan_quotations_service_1 = require("./client-plan-quotations.service");
const create_client_plan_quotation_dto_1 = require("./dto/create-client-plan-quotation.dto");
const update_client_plan_quotation_dto_1 = require("./dto/update-client-plan-quotation.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ClientPlanQuotationsController = class ClientPlanQuotationsController {
    constructor(quotationsService) {
        this.quotationsService = quotationsService;
    }
    async create(createDto) {
        return this.quotationsService.create(createDto);
    }
    async findAll() {
        return this.quotationsService.findAll();
    }
    async findOne(id) {
        return this.quotationsService.findOne(id);
    }
    async update(id, updateDto) {
        return this.quotationsService.update(id, updateDto);
    }
    async remove(id) {
        await this.quotationsService.remove(id);
    }
};
exports.ClientPlanQuotationsController = ClientPlanQuotationsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new client plan quotation' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The quotation has been successfully created.',
        type: create_client_plan_quotation_dto_1.CreateClientPlanQuotationDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_plan_quotation_dto_1.CreateClientPlanQuotationDto]),
    __metadata("design:returntype", Promise)
], ClientPlanQuotationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all client plan quotations' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved all quotations.',
        type: [create_client_plan_quotation_dto_1.CreateClientPlanQuotationDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientPlanQuotationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a client plan quotation by ID' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Quotation found.',
        type: create_client_plan_quotation_dto_1.CreateClientPlanQuotationDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Quotation not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientPlanQuotationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing client plan quotation' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The quotation has been successfully updated.',
        type: create_client_plan_quotation_dto_1.CreateClientPlanQuotationDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Quotation not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_client_plan_quotation_dto_1.UpdateClientPlanQuotationDto]),
    __metadata("design:returntype", Promise)
], ClientPlanQuotationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a client plan quotation' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'The quotation has been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Quotation not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientPlanQuotationsController.prototype, "remove", null);
exports.ClientPlanQuotationsController = ClientPlanQuotationsController = __decorate([
    (0, swagger_1.ApiTags)('client-plan-quotations'),
    (0, common_1.Controller)('client-plan-quotations'),
    __metadata("design:paramtypes", [client_plan_quotations_service_1.ClientPlanQuotationsService])
], ClientPlanQuotationsController);
//# sourceMappingURL=client-plan-quotations.controller.js.map
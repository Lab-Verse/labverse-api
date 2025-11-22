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
exports.ClientInteractionsController = void 0;
const common_1 = require("@nestjs/common");
const client_interactions_service_1 = require("./client-interactions.service");
const create_client_interaction_dto_1 = require("./dto/create-client-interaction.dto");
const update_client_interaction_dto_1 = require("./dto/update-client-interaction.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let ClientInteractionsController = class ClientInteractionsController {
    constructor(clientInteractionsService) {
        this.clientInteractionsService = clientInteractionsService;
    }
    create(createClientInteractionDto) {
        return this.clientInteractionsService.create(createClientInteractionDto);
    }
    findAll() {
        return this.clientInteractionsService.findAll();
    }
    findByClient(clientId) {
        return this.clientInteractionsService.findByClient(clientId);
    }
    findOne(id) {
        return this.clientInteractionsService.findOne(id);
    }
    update(id, updateClientInteractionDto) {
        return this.clientInteractionsService.update(id, updateClientInteractionDto);
    }
    remove(id) {
        return this.clientInteractionsService.remove(id);
    }
};
exports.ClientInteractionsController = ClientInteractionsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new client interaction' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_interaction_dto_1.CreateClientInteractionDto]),
    __metadata("design:returntype", void 0)
], ClientInteractionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all client interactions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClientInteractionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('client/:clientId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all interactions for a specific client' }),
    __param(0, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientInteractionsController.prototype, "findByClient", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific client interaction by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientInteractionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a specific client interaction by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_client_interaction_dto_1.UpdateClientInteractionDto]),
    __metadata("design:returntype", void 0)
], ClientInteractionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a specific client interaction by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientInteractionsController.prototype, "remove", null);
exports.ClientInteractionsController = ClientInteractionsController = __decorate([
    (0, swagger_1.ApiTags)('Client Interactions'),
    (0, common_1.Controller)('client-interactions'),
    __metadata("design:paramtypes", [client_interactions_service_1.ClientInteractionsService])
], ClientInteractionsController);
//# sourceMappingURL=client-interactions.controller.js.map
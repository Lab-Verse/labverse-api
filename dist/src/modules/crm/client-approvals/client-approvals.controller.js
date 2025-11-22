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
exports.ClientApprovalsController = void 0;
const common_1 = require("@nestjs/common");
const client_approvals_service_1 = require("./client-approvals.service");
const create_client_approval_dto_1 = require("./dto/create-client-approval.dto");
const update_client_approval_dto_1 = require("./dto/update-client-approval.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let ClientApprovalsController = class ClientApprovalsController {
    constructor(clientApprovalsService) {
        this.clientApprovalsService = clientApprovalsService;
    }
    async createApproval(createClientApprovalDto) {
        return this.clientApprovalsService.createApproval(createClientApprovalDto);
    }
    async findAllApprovals() {
        return this.clientApprovalsService.findAllApprovals();
    }
    async findApprovalsByClient(clientId) {
        return this.clientApprovalsService.findApprovalsByClient(clientId);
    }
    async findApprovalById(id) {
        return this.clientApprovalsService.findApprovalById(id);
    }
    async respondToApproval(id, updateClientApprovalDto) {
        return this.clientApprovalsService.respondToApproval(id, updateClientApprovalDto);
    }
    async deleteApproval(id) {
        await this.clientApprovalsService.deleteApproval(id);
        return { message: 'Approval request deleted successfully.' };
    }
};
exports.ClientApprovalsController = ClientApprovalsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new client approval' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_approval_dto_1.CreateClientApprovalDto]),
    __metadata("design:returntype", Promise)
], ClientApprovalsController.prototype, "createApproval", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all client approvals' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientApprovalsController.prototype, "findAllApprovals", null);
__decorate([
    (0, common_1.Get)('client/:clientId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all approvals for a specific client' }),
    __param(0, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientApprovalsController.prototype, "findApprovalsByClient", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific client approval by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientApprovalsController.prototype, "findApprovalById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Respond to a specific client approval by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_client_approval_dto_1.UpdateClientApprovalDto]),
    __metadata("design:returntype", Promise)
], ClientApprovalsController.prototype, "respondToApproval", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a specific client approval by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientApprovalsController.prototype, "deleteApproval", null);
exports.ClientApprovalsController = ClientApprovalsController = __decorate([
    (0, swagger_1.ApiTags)('Client Approvals'),
    (0, common_1.Controller)('client-approvals'),
    __metadata("design:paramtypes", [client_approvals_service_1.ClientApprovalsService])
], ClientApprovalsController);
//# sourceMappingURL=client-approvals.controller.js.map
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
exports.SupportTicketsController = void 0;
const common_1 = require("@nestjs/common");
const support_tickets_service_1 = require("./support-tickets.service");
const create_ticket_dto_1 = require("./dto/create-ticket.dto");
const update_ticket_dto_1 = require("./dto/update-ticket.dto");
const create_reply_dto_1 = require("./dto/create-reply.dto");
const update_reply_dto_1 = require("./dto/update-reply.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const role_enum_1 = require("../roles/role.enum");
const uuid_validation_pipe_1 = require("../../common/pipes/uuid-validation.pipe");
const swagger_1 = require("@nestjs/swagger");
let SupportTicketsController = class SupportTicketsController {
    constructor(supportTicketsService) {
        this.supportTicketsService = supportTicketsService;
    }
    async createTicket(createTicketDto) {
        return this.supportTicketsService.createTicket(createTicketDto);
    }
    async findAllTickets() {
        return this.supportTicketsService.findAllTickets();
    }
    async findTicketsByClient(clientId) {
        return this.supportTicketsService.findTicketsByClient(clientId);
    }
    async findTicketById(id) {
        return this.supportTicketsService.findTicketById(id);
    }
    async getTicketMessages(id) {
        return this.supportTicketsService.getTicketMessages(id);
    }
    async updateTicket(id, updateTicketDto) {
        return this.supportTicketsService.updateTicket(id, updateTicketDto);
    }
    async deleteTicket(id) {
        await this.supportTicketsService.deleteTicket(id);
        return { message: 'Ticket deleted successfully.' };
    }
    async addReplyToTicket(ticketId, createTicketReplyDto) {
        return this.supportTicketsService.addReplyToTicket(ticketId, createTicketReplyDto);
    }
    async updateReply(replyId, updateReplyDto) {
        return this.supportTicketsService.updateReply(replyId, updateReplyDto);
    }
    async markTicketAsRead(ticketId, userId) {
        return this.supportTicketsService.markTicketAsRead(ticketId, userId);
    }
    async getUnreadCount(ticketId, userId) {
        return this.supportTicketsService.getUnreadCount(ticketId, userId);
    }
};
exports.SupportTicketsController = SupportTicketsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new support ticket' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ticket_dto_1.CreateTicketDto]),
    __metadata("design:returntype", Promise)
], SupportTicketsController.prototype, "createTicket", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all support tickets' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SupportTicketsController.prototype, "findAllTickets", null);
__decorate([
    (0, common_1.Get)('client/:clientId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all support tickets for a client' }),
    __param(0, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupportTicketsController.prototype, "findTicketsByClient", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a support ticket by ID' }),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPPORT, role_enum_1.RoleEnum.CLIENT),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UuidValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupportTicketsController.prototype, "findTicketById", null);
__decorate([
    (0, common_1.Get)(':id/messages'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all messages for a support ticket' }),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPPORT, role_enum_1.RoleEnum.CLIENT),
    __param(0, (0, common_1.Param)('id', uuid_validation_pipe_1.UuidValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupportTicketsController.prototype, "getTicketMessages", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPPORT),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a support ticket' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ticket_dto_1.UpdateTicketDto]),
    __metadata("design:returntype", Promise)
], SupportTicketsController.prototype, "updateTicket", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a support ticket' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupportTicketsController.prototype, "deleteTicket", null);
__decorate([
    (0, common_1.Post)(':ticketId/replies'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a reply to a support ticket' }),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPPORT, role_enum_1.RoleEnum.CLIENT),
    __param(0, (0, common_1.Param)('ticketId', uuid_validation_pipe_1.UuidValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_reply_dto_1.CreateTicketReplyDto]),
    __metadata("design:returntype", Promise)
], SupportTicketsController.prototype, "addReplyToTicket", null);
__decorate([
    (0, common_1.Patch)('replies/:replyId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a reply to a support ticket' }),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPPORT),
    __param(0, (0, common_1.Param)('replyId', uuid_validation_pipe_1.UuidValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_reply_dto_1.UpdateReplyDto]),
    __metadata("design:returntype", Promise)
], SupportTicketsController.prototype, "updateReply", null);
__decorate([
    (0, common_1.Patch)(':ticketId/mark-read'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark a support ticket as read' }),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPPORT, role_enum_1.RoleEnum.CLIENT),
    __param(0, (0, common_1.Param)('ticketId', uuid_validation_pipe_1.UuidValidationPipe)),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SupportTicketsController.prototype, "markTicketAsRead", null);
__decorate([
    (0, common_1.Get)(':ticketId/unread-count'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the unread count for a support ticket' }),
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN, role_enum_1.RoleEnum.SUPPORT, role_enum_1.RoleEnum.CLIENT),
    __param(0, (0, common_1.Param)('ticketId', uuid_validation_pipe_1.UuidValidationPipe)),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SupportTicketsController.prototype, "getUnreadCount", null);
exports.SupportTicketsController = SupportTicketsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('Support Tickets and Replies'),
    (0, common_1.Controller)('support-tickets'),
    __metadata("design:paramtypes", [support_tickets_service_1.SupportTicketsService])
], SupportTicketsController);
//# sourceMappingURL=support-tickets.controller.js.map
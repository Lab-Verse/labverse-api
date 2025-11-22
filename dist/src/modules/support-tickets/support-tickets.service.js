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
exports.SupportTicketsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ticket_entity_1 = require("./entities/ticket.entity");
const ticket_reply_entity_1 = require("./entities/ticket-reply.entity");
const validation_util_1 = require("../../common/utils/validation.util");
const logger_util_1 = require("../../common/utils/logger.util");
let SupportTicketsService = class SupportTicketsService {
    constructor(ticketRepository, ticketReplyRepository) {
        this.ticketRepository = ticketRepository;
        this.ticketReplyRepository = ticketReplyRepository;
    }
    async createTicket(createTicketDto) {
        validation_util_1.ValidationUtil.validateString(createTicketDto.title, 'title', 3, 200);
        validation_util_1.ValidationUtil.validateString(createTicketDto.description, 'description', 10, 2000);
        if (createTicketDto.clientId) {
            validation_util_1.ValidationUtil.validateUUID(createTicketDto.clientId, 'clientId');
        }
        if (createTicketDto.assignedToId) {
            validation_util_1.ValidationUtil.validateUUID(createTicketDto.assignedToId, 'assignedToId');
        }
        if (createTicketDto.priority) {
            validation_util_1.ValidationUtil.validateString(createTicketDto.priority, 'priority', 1, 20);
        }
        if (createTicketDto.status) {
            validation_util_1.ValidationUtil.validateString(createTicketDto.status, 'status', 1, 20);
        }
        if (createTicketDto.category) {
            validation_util_1.ValidationUtil.validateString(createTicketDto.category, 'category', 1, 50);
        }
        const ticket = this.ticketRepository.create({
            clientId: createTicketDto.clientId,
            title: validation_util_1.ValidationUtil.sanitizeString(createTicketDto.title),
            subject: validation_util_1.ValidationUtil.sanitizeString(createTicketDto.subject),
            description: validation_util_1.ValidationUtil.sanitizeString(createTicketDto.description),
            category: createTicketDto.category
                ? validation_util_1.ValidationUtil.sanitizeString(createTicketDto.category)
                : undefined,
            assignedTo: createTicketDto.assignedToId,
            priority: createTicketDto.priority,
            status: createTicketDto.status,
        });
        const savedTicket = await this.ticketRepository.save(ticket);
        logger_util_1.SafeLogger.log(`Support ticket created: ${createTicketDto.title}`, 'SupportTicketsService');
        return {
            success: true,
            message: 'Support ticket created successfully',
            data: savedTicket,
        };
    }
    async findAllTickets() {
        const tickets = await this.ticketRepository.find({
            order: { createdAt: 'DESC' },
            relations: ['replies'],
        });
        return {
            success: true,
            message: 'Support tickets retrieved successfully',
            data: tickets,
        };
    }
    async findTicketsByClient(clientId) {
        validation_util_1.ValidationUtil.validateUUID(clientId, 'clientId');
        const tickets = await this.ticketRepository.find({
            where: { clientId },
            order: { createdAt: 'DESC' },
            relations: ['replies'],
        });
        return {
            success: true,
            message: 'Client tickets retrieved successfully',
            data: tickets,
        };
    }
    async findTicketById(id) {
        validation_util_1.ValidationUtil.validateUUID(id, 'ticketId');
        const ticket = await this.ticketRepository.findOne({
            where: { id },
            relations: ['replies'],
            order: {
                replies: {
                    createdAt: 'ASC',
                },
            },
        });
        if (!ticket) {
            throw new common_1.NotFoundException(`Ticket with ID "${id}" not found`);
        }
        return {
            success: true,
            message: 'Ticket retrieved successfully',
            data: ticket,
        };
    }
    async getTicketMessages(ticketId) {
        validation_util_1.ValidationUtil.validateUUID(ticketId, 'ticketId');
        const ticket = await this.ticketRepository.findOne({
            where: { id: ticketId },
        });
        if (!ticket) {
            throw new common_1.NotFoundException(`Ticket with ID "${ticketId}" not found`);
        }
        const replies = await this.ticketReplyRepository.find({
            where: { ticketId },
            order: { createdAt: 'ASC' },
        });
        return {
            success: true,
            message: 'Ticket messages retrieved successfully',
            data: replies,
        };
    }
    async updateTicket(id, updateTicketDto) {
        validation_util_1.ValidationUtil.validateUUID(id, 'ticketId');
        if (updateTicketDto.title) {
            validation_util_1.ValidationUtil.validateString(updateTicketDto.title, 'title', 3, 200);
        }
        if (updateTicketDto.description) {
            validation_util_1.ValidationUtil.validateString(updateTicketDto.description, 'description', 10, 2000);
        }
        if (updateTicketDto.assignedTo) {
            validation_util_1.ValidationUtil.validateUUID(updateTicketDto.assignedTo, 'assignedTo');
        }
        if (updateTicketDto.priority) {
            validation_util_1.ValidationUtil.validateString(updateTicketDto.priority, 'priority', 1, 20);
        }
        if (updateTicketDto.status) {
            validation_util_1.ValidationUtil.validateString(updateTicketDto.status, 'status', 1, 20);
        }
        if (updateTicketDto.category) {
            validation_util_1.ValidationUtil.validateString(updateTicketDto.category, 'category', 1, 50);
        }
        const ticketResult = await this.findTicketById(id);
        const ticket = ticketResult.data;
        const updateData = {
            ...updateTicketDto,
            ...(updateTicketDto.title && {
                title: validation_util_1.ValidationUtil.sanitizeString(updateTicketDto.title),
            }),
            ...(updateTicketDto.description && {
                description: validation_util_1.ValidationUtil.sanitizeString(updateTicketDto.description),
            }),
            ...(updateTicketDto.category && {
                category: validation_util_1.ValidationUtil.sanitizeString(updateTicketDto.category),
            }),
        };
        this.ticketRepository.merge(ticket, updateData);
        const updatedTicket = await this.ticketRepository.save(ticket);
        logger_util_1.SafeLogger.log(`Support ticket updated: ${id}`, 'SupportTicketsService');
        return {
            success: true,
            message: 'Support ticket updated successfully',
            data: updatedTicket,
        };
    }
    async deleteTicket(id) {
        validation_util_1.ValidationUtil.validateUUID(id, 'ticketId');
        const result = await this.ticketRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Ticket with ID "${id}" not found`);
        }
        logger_util_1.SafeLogger.log(`Support ticket deleted: ${id}`, 'SupportTicketsService');
        return {
            success: true,
            message: 'Support ticket deleted successfully',
        };
    }
    async addReplyToTicket(ticketId, createTicketReplyDto) {
        validation_util_1.ValidationUtil.validateUUID(ticketId, 'ticketId');
        validation_util_1.ValidationUtil.validateString(createTicketReplyDto.message, 'message', 1, 2000);
        if (createTicketReplyDto.senderId) {
            validation_util_1.ValidationUtil.validateUUID(createTicketReplyDto.senderId, 'senderId');
        }
        const ticket = await this.ticketRepository.findOne({
            where: { id: ticketId },
        });
        if (!ticket) {
            throw new common_1.NotFoundException(`Ticket with ID "${ticketId}" not found`);
        }
        const reply = this.ticketReplyRepository.create({
            ...createTicketReplyDto,
            message: validation_util_1.ValidationUtil.sanitizeString(createTicketReplyDto.message),
            ticketId,
        });
        const savedReply = await this.ticketReplyRepository.save(reply);
        logger_util_1.SafeLogger.log(`Reply added to ticket: ${ticketId}`, 'SupportTicketsService');
        return {
            success: true,
            message: 'Reply added successfully',
            data: savedReply,
        };
    }
    async updateReply(replyId, updateReplyDto) {
        validation_util_1.ValidationUtil.validateUUID(replyId, 'replyId');
        if (updateReplyDto.message) {
            validation_util_1.ValidationUtil.validateString(updateReplyDto.message, 'message', 1, 2000);
        }
        const reply = await this.ticketReplyRepository.findOne({
            where: { id: replyId },
        });
        if (!reply) {
            throw new common_1.NotFoundException(`Reply with ID "${replyId}" not found`);
        }
        const updateData = {
            ...updateReplyDto,
            ...(updateReplyDto.message && {
                message: validation_util_1.ValidationUtil.sanitizeString(updateReplyDto.message),
            }),
        };
        this.ticketReplyRepository.merge(reply, updateData);
        const updatedReply = await this.ticketReplyRepository.save(reply);
        logger_util_1.SafeLogger.log(`Ticket reply updated: ${replyId}`, 'SupportTicketsService');
        return {
            success: true,
            message: 'Reply updated successfully',
            data: updatedReply,
        };
    }
    async markTicketAsRead(ticketId, userId) {
        validation_util_1.ValidationUtil.validateUUID(ticketId, 'ticketId');
        validation_util_1.ValidationUtil.validateUUID(userId, 'userId');
        const ticket = await this.ticketRepository.findOne({
            where: { id: ticketId },
        });
        if (!ticket) {
            throw new common_1.NotFoundException(`Ticket with ID "${ticketId}" not found`);
        }
        const result = await this.ticketReplyRepository.update({
            ticketId,
            isRead: false,
        }, {
            isRead: true,
            readAt: new Date(),
        });
        logger_util_1.SafeLogger.log(`Ticket marked as read: ${ticketId} by user: ${userId}`, 'SupportTicketsService');
        return {
            success: true,
            message: 'Messages marked as read successfully',
            data: { markedCount: result.affected || 0 },
        };
    }
    async getUnreadCount(ticketId, userId) {
        validation_util_1.ValidationUtil.validateUUID(ticketId, 'ticketId');
        validation_util_1.ValidationUtil.validateUUID(userId, 'userId');
        const count = await this.ticketReplyRepository.count({
            where: {
                ticketId,
                isRead: false,
                senderId: { $ne: userId },
            },
        });
        return {
            success: true,
            message: 'Unread count retrieved successfully',
            data: { unreadCount: count },
        };
    }
};
exports.SupportTicketsService = SupportTicketsService;
exports.SupportTicketsService = SupportTicketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __param(1, (0, typeorm_1.InjectRepository)(ticket_reply_entity_1.TicketReply)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SupportTicketsService);
//# sourceMappingURL=support-tickets.service.js.map
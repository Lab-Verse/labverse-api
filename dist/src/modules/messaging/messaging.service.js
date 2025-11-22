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
exports.MessagingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const conversation_entity_1 = require("./entities/conversation.entity");
const conversation_participant_entity_1 = require("./entities/conversation-participant.entity");
const message_entity_1 = require("./entities/message.entity");
const security_util_1 = require("../../common/utils/security.util");
let MessagingService = class MessagingService {
    constructor(conversationRepository, participantRepository, messageRepository) {
        this.conversationRepository = conversationRepository;
        this.participantRepository = participantRepository;
        this.messageRepository = messageRepository;
    }
    async createConversation(createConversationDto) {
        const { participantUserIds, ...conversationData } = createConversationDto;
        if (participantUserIds &&
            (!Array.isArray(participantUserIds) || participantUserIds.length === 0)) {
            throw new common_1.BadRequestException('`participantUserIds` must be a valid array of user IDs.');
        }
        if (!conversationData.isGroupChat &&
            participantUserIds &&
            participantUserIds.length > 2) {
            throw new common_1.BadRequestException('Direct chats cannot have more than two participants.');
        }
        const conversation = this.conversationRepository.create(conversationData);
        const savedConversation = await this.conversationRepository.save(conversation);
        if (participantUserIds && participantUserIds.length > 0) {
            const participants = participantUserIds.map((userId) => {
                return this.participantRepository.create({
                    conversation: savedConversation,
                    userId,
                });
            });
            await this.participantRepository.save(participants);
        }
        return savedConversation;
    }
    async findUserConversations(userId) {
        security_util_1.SecurityUtil.validateUUID(userId);
        const participants = await this.participantRepository.find({
            where: { userId },
            relations: ['conversation'],
        });
        return participants.map((p) => p.conversation);
    }
    async findConversationById(id) {
        security_util_1.SecurityUtil.validateUUID(id);
        const validId = security_util_1.SecurityUtil.validateId(id);
        const conversation = await this.conversationRepository.findOne({
            where: { id: validId },
            relations: ['participants'],
        });
        if (!conversation) {
            throw new common_1.NotFoundException('Conversation not found');
        }
        return conversation;
    }
    async addParticipant(conversationId, userId) {
        security_util_1.SecurityUtil.validateUUID(conversationId);
        security_util_1.SecurityUtil.validateUUID(userId);
        const conversation = await this.findConversationById(conversationId);
        if (!conversation.is_group_chat) {
            throw new common_1.BadRequestException('Cannot add participants to a direct chat.');
        }
        const existingParticipant = await this.participantRepository.findOne({
            where: { conversation: { id: conversationId }, userId },
        });
        if (existingParticipant) {
            throw new common_1.BadRequestException('User is already a participant.');
        }
        const newParticipant = this.participantRepository.create({
            conversation,
            userId,
        });
        return await this.participantRepository.save(newParticipant);
    }
    async removeParticipant(conversationId, userId) {
        security_util_1.SecurityUtil.validateUUID(conversationId);
        security_util_1.SecurityUtil.validateUUID(userId);
        const conversation = await this.findConversationById(conversationId);
        if (!conversation.is_group_chat) {
            throw new common_1.BadRequestException('Cannot remove participants from a direct chat.');
        }
        const participant = await this.participantRepository.findOne({
            where: { conversation: { id: conversationId }, userId },
        });
        if (!participant) {
            throw new common_1.NotFoundException('Participant not found in this conversation.');
        }
        await this.participantRepository.remove(participant);
    }
    async createMessage(createMessageDto) {
        const { conversationId, ...messageData } = createMessageDto;
        const conversation = await this.conversationRepository.findOne({
            where: { id: conversationId },
        });
        if (!conversation) {
            throw new common_1.NotFoundException(`Conversation with ID ${conversationId} not found.`);
        }
        const message = this.messageRepository.create({
            ...messageData,
            conversation,
        });
        return await this.messageRepository.save(message);
    }
    async findMessagesByConversationId(conversationId, take = 50, skip = 0) {
        const validConversationId = security_util_1.SecurityUtil.validateId(conversationId);
        const conversationExists = await this.conversationRepository.exists({
            where: { id: validConversationId },
        });
        if (!conversationExists) {
            throw new common_1.NotFoundException('Conversation not found.');
        }
        return this.messageRepository.find({
            where: { conversation: { id: validConversationId } },
            order: { createdAt: 'DESC' },
            take,
            skip,
        });
    }
    async markMessageAsRead(conversationId, userId, messageId) {
        const validConversationId = security_util_1.SecurityUtil.validateId(conversationId);
        const validUserId = security_util_1.SecurityUtil.validateId(userId);
        const validMessageId = security_util_1.SecurityUtil.validateId(messageId);
        const participant = await this.participantRepository.findOne({
            where: { conversation: { id: validConversationId }, userId: validUserId },
        });
        if (!participant) {
            throw new common_1.NotFoundException('Participant not found in this conversation.');
        }
        const message = await this.messageRepository.findOne({
            where: { id: validMessageId },
        });
        if (!message) {
            throw new common_1.NotFoundException('Message not found.');
        }
        participant.lastReadMessage = message;
        await this.participantRepository.save(participant);
    }
    async deleteConversation(conversationId) {
        const validConversationId = security_util_1.SecurityUtil.validateId(conversationId);
        const conversation = await this.conversationRepository.findOne({
            where: { id: validConversationId },
            relations: ['participants', 'messages'],
        });
        if (!conversation) {
            throw new common_1.NotFoundException('Conversation not found.');
        }
        await this.messageRepository.delete({
            conversation: { id: validConversationId },
        });
        await this.participantRepository.delete({
            conversation: { id: validConversationId },
        });
        await this.conversationRepository.delete(validConversationId);
        return { message: 'Conversation successfully deleted' };
    }
};
exports.MessagingService = MessagingService;
exports.MessagingService = MessagingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(conversation_entity_1.Conversation)),
    __param(1, (0, typeorm_1.InjectRepository)(conversation_participant_entity_1.ConversationParticipant)),
    __param(2, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MessagingService);
//# sourceMappingURL=messaging.service.js.map
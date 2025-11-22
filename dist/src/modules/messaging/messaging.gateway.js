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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const messaging_service_1 = require("./messaging.service");
const create_message_dto_1 = require("./dto/create-message.dto");
const security_util_1 = require("../../common/utils/security.util");
let MessagesGateway = class MessagesGateway {
    constructor(messagingService) {
        this.messagingService = messagingService;
    }
    handleConnection(client) {
        console.log(`Client connected: ${security_util_1.SecurityUtil.sanitizeLogMessage(client.id)}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${security_util_1.SecurityUtil.sanitizeLogMessage(client.id)}`);
    }
    async handleSendMessage(client, payload) {
        try {
            const message = await this.messagingService.createMessage(payload);
            this.server.to(payload.conversationId).emit('newMessage', message);
        }
        catch (error) {
            client.emit('error', 'Failed to send message.');
        }
    }
    async handleReadMessage(client, payload) {
        const { conversationId, userId, messageId } = payload;
        try {
            await this.messagingService.markMessageAsRead(conversationId, userId, messageId);
            this.server
                .to(conversationId)
                .emit('messageRead', { conversationId, userId, messageId });
        }
        catch (error) {
            client.emit('error', 'Failed to mark message as read.');
        }
    }
};
exports.MessagesGateway = MessagesGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagesGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('readMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleReadMessage", null);
exports.MessagesGateway = MessagesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService])
], MessagesGateway);
//# sourceMappingURL=messaging.gateway.js.map
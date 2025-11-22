"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const messaging_controller_1 = require("./messaging.controller");
const messaging_service_1 = require("./messaging.service");
const messaging_gateway_1 = require("./messaging.gateway");
const conversation_entity_1 = require("./entities/conversation.entity");
const conversation_participant_entity_1 = require("./entities/conversation-participant.entity");
const message_entity_1 = require("./entities/message.entity");
let MessagingModule = class MessagingModule {
};
exports.MessagingModule = MessagingModule;
exports.MessagingModule = MessagingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([conversation_entity_1.Conversation, conversation_participant_entity_1.ConversationParticipant, message_entity_1.Message]),
        ],
        controllers: [messaging_controller_1.MessagingController],
        providers: [messaging_service_1.MessagingService, messaging_gateway_1.MessagesGateway],
    })
], MessagingModule);
//# sourceMappingURL=messaging.module.js.map
import { MessagingService } from './messaging.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagingController {
    private readonly messagingService;
    constructor(messagingService: MessagingService);
    createConversation(createConversationDto: CreateConversationDto): Promise<import("./entities/conversation.entity").Conversation>;
    getUserConversations(userId: string): Promise<import("./entities/conversation.entity").Conversation[]>;
    getConversationById(id: string): Promise<import("./entities/conversation.entity").Conversation>;
    addParticipant(conversationId: string, body: {
        participantUserIds?: string[];
        userId?: string;
    }): Promise<any[] | import("./entities/conversation-participant.entity").ConversationParticipant>;
    removeParticipant(conversationId: string, userId: string): Promise<{
        message: string;
    }>;
    createMessage(createMessageDto: CreateMessageDto): Promise<import("./entities/message.entity").Message>;
    getMessagesByConversationId(conversationId: string, take?: string, skip?: string): Promise<import("./entities/message.entity").Message[]>;
    markMessageAsRead(messageId: string, conversationId: string, userId: string): Promise<{
        message: string;
    }>;
    deleteConversation(id: string): Promise<{
        message: string;
    }>;
}

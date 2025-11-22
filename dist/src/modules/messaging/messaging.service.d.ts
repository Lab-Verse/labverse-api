import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { ConversationParticipant } from './entities/conversation-participant.entity';
import { Message } from './entities/message.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagingService {
    private conversationRepository;
    private participantRepository;
    private messageRepository;
    constructor(conversationRepository: Repository<Conversation>, participantRepository: Repository<ConversationParticipant>, messageRepository: Repository<Message>);
    createConversation(createConversationDto: CreateConversationDto): Promise<Conversation>;
    findUserConversations(userId: string): Promise<Conversation[]>;
    findConversationById(id: string): Promise<Conversation>;
    addParticipant(conversationId: string, userId: string): Promise<ConversationParticipant>;
    removeParticipant(conversationId: string, userId: string): Promise<void>;
    createMessage(createMessageDto: CreateMessageDto): Promise<Message>;
    findMessagesByConversationId(conversationId: string, take?: number, skip?: number): Promise<Message[]>;
    markMessageAsRead(conversationId: string, userId: string, messageId: string): Promise<void>;
    deleteConversation(conversationId: string): Promise<{
        message: string;
    }>;
}

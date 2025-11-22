import { Conversation } from './conversation.entity';
import { Message } from './message.entity';
export declare class ConversationParticipant {
    id: string;
    conversation: Conversation;
    userId: string;
    lastReadMessage: Message;
    joinedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

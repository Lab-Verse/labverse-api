import { Conversation } from './conversation.entity';
export declare class Message {
    id: string;
    conversation: Conversation;
    senderId: string;
    content: string;
    messageType: string;
    createdAt: Date;
    updatedAt: Date;
}

import { ConversationParticipant } from './conversation-participant.entity';
import { Message } from './message.entity';
export declare class Conversation {
    id: string;
    name: string;
    is_group_chat: boolean;
    participants: ConversationParticipant[];
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}

import { TicketReply } from './ticket-reply.entity';
export declare enum TicketStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    CLOSED = "closed",
    REOPENED = "reopened"
}
export declare enum TicketPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent"
}
export declare class Ticket {
    id: string;
    clientId: string;
    title: string;
    subject: string;
    category: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    assignedTo: string;
    replies: TicketReply[];
    createdAt: Date;
    updatedAt: Date;
}

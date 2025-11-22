import { Ticket } from './ticket.entity';
export declare class TicketReply {
    id: string;
    ticketId: string;
    senderId: string;
    content: string;
    message: string;
    isInternal: boolean;
    isRead: boolean;
    readAt: Date;
    ticket: Ticket;
    createdAt: Date;
    updatedAt: Date;
}

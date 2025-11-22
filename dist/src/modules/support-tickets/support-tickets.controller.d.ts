import { SupportTicketsService } from './support-tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { CreateTicketReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
export declare class SupportTicketsController {
    private readonly supportTicketsService;
    constructor(supportTicketsService: SupportTicketsService);
    createTicket(createTicketDto: CreateTicketDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/ticket.entity").Ticket;
    }>;
    findAllTickets(): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/ticket.entity").Ticket[];
    }>;
    findTicketsByClient(clientId: string): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/ticket.entity").Ticket[];
    }>;
    findTicketById(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/ticket.entity").Ticket;
    }>;
    getTicketMessages(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/ticket-reply.entity").TicketReply[];
    }>;
    updateTicket(id: string, updateTicketDto: UpdateTicketDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/ticket.entity").Ticket;
    }>;
    deleteTicket(id: string): Promise<{
        message: string;
    }>;
    addReplyToTicket(ticketId: string, createTicketReplyDto: CreateTicketReplyDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/ticket-reply.entity").TicketReply;
    }>;
    updateReply(replyId: string, updateReplyDto: UpdateReplyDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/ticket-reply.entity").TicketReply;
    }>;
    markTicketAsRead(ticketId: string, userId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            markedCount: number;
        };
    }>;
    getUnreadCount(ticketId: string, userId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            unreadCount: number;
        };
    }>;
}

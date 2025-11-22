import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketReply } from './entities/ticket-reply.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { CreateTicketReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
export declare class SupportTicketsService {
    private ticketRepository;
    private ticketReplyRepository;
    constructor(ticketRepository: Repository<Ticket>, ticketReplyRepository: Repository<TicketReply>);
    createTicket(createTicketDto: CreateTicketDto): Promise<{
        success: boolean;
        message: string;
        data: Ticket;
    }>;
    findAllTickets(): Promise<{
        success: boolean;
        message: string;
        data: Ticket[];
    }>;
    findTicketsByClient(clientId: string): Promise<{
        success: boolean;
        message: string;
        data: Ticket[];
    }>;
    findTicketById(id: string): Promise<{
        success: boolean;
        message: string;
        data: Ticket;
    }>;
    getTicketMessages(ticketId: string): Promise<{
        success: boolean;
        message: string;
        data: TicketReply[];
    }>;
    updateTicket(id: string, updateTicketDto: UpdateTicketDto): Promise<{
        success: boolean;
        message: string;
        data: Ticket;
    }>;
    deleteTicket(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    addReplyToTicket(ticketId: string, createTicketReplyDto: CreateTicketReplyDto): Promise<{
        success: boolean;
        message: string;
        data: TicketReply;
    }>;
    updateReply(replyId: string, updateReplyDto: UpdateReplyDto): Promise<{
        success: boolean;
        message: string;
        data: TicketReply;
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

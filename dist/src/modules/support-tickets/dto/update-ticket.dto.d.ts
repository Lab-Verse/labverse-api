import { TicketStatus, TicketPriority } from '../entities/ticket.entity';
export declare class UpdateTicketDto {
    title?: string;
    description?: string;
    status?: TicketStatus;
    priority?: TicketPriority;
    assignedTo?: string;
    category?: string;
}

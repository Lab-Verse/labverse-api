import { LeadStatus } from '../entities/lead.entity';
export declare class CreateLeadDto {
    companyName?: string;
    contactPersonName: string;
    email: string;
    phoneNumber?: string;
    notes?: string;
    status?: LeadStatus;
    assignedTo?: string;
}

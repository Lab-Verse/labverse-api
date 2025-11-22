import { Client } from '../../crm/clients/entities/clients.entity';
import { DevelopmentPlan } from '../../development/development-plans/entities/development-plan.entity';
import { User } from '../../users/entities/user.entity';
import { ClientPlanQuotationStatus } from '../enums/client-plan-quotation-status.enum';
import { Invoice } from '../../billing/invoices/entities/invoice.entity';
export declare class ClientPlanQuotation {
    id: string;
    client_id: string;
    plan_id: string;
    status: ClientPlanQuotationStatus;
    discount_percent: number;
    notes: string;
    total_amount: number;
    created_by: string;
    created_at: Date;
    updated_at: Date;
    client: Client;
    plan: DevelopmentPlan;
    createdBy: User;
    invoices: Invoice[];
    createdByUser: User;
}

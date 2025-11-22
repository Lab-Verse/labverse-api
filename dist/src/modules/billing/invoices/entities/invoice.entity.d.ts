import { Project } from '../../../project-management/projects/entities/projects.entity';
import { ClientPlanQuotation } from '../../../client-plan-quotations/entities/client-plan-quotation.entity';
import { InvoiceStatus } from '../enums/invoice-status.enum';
import { InvoiceItem } from '../../invoice-items/entities/invoice-item.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { Client } from '../../../crm/clients/entities/clients.entity';
export declare class Invoice {
    id: string;
    invoice_number: string;
    client_id: string;
    project_id: string;
    quotation_id: string;
    status: InvoiceStatus;
    issue_date: Date;
    due_date: Date;
    total_amount: number;
    paid_amount: number;
    description: string;
    created_at: Date;
    updated_at: Date;
    client: Client;
    project: Project;
    quotation: ClientPlanQuotation;
    invoiceItems: InvoiceItem[];
    payments: Payment[];
}

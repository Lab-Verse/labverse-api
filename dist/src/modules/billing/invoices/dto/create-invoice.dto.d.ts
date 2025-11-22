import { InvoiceStatus } from '../enums/invoice-status.enum';
export declare class CreateInvoiceDto {
    invoice_number?: string;
    client_id: string;
    project_id?: string;
    quotation_id?: string;
    status?: InvoiceStatus;
    issue_date: Date;
    due_date: Date;
    total_amount: number;
    paid_amount?: number;
    description?: string;
}

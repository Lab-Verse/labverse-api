import { Invoice } from '../../invoices/entities/invoice.entity';
import { Service } from '../../../services/entities/service.entity';
export declare class InvoiceItem {
    id: string;
    invoiceId: string;
    serviceId: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
    invoice: Invoice;
    service?: Service;
}

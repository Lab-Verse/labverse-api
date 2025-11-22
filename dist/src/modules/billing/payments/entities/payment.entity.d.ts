import { Invoice } from '../../invoices/entities/invoice.entity';
export declare enum PaymentMethod {
    CREDIT_CARD = "Credit Card",
    BANK_TRANSFER = "Bank Transfer",
    PAYPAL = "PayPal",
    CASH = "Cash",
    CHECK = "Check"
}
export declare class Payment {
    id: string;
    invoiceId: string;
    paymentAmount: number;
    paymentDate: Date;
    paymentMethod: PaymentMethod;
    transactionReference: string;
    createdAt: Date;
    updatedAt: Date;
    invoice: Invoice;
}

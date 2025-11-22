import { PaymentMethod } from '../entities/payment.entity';
export declare class CreatePaymentDto {
    invoiceId: string;
    paymentAmount: number;
    paymentDate: string;
    paymentMethod: PaymentMethod;
    transactionReference?: string;
}

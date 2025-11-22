import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Invoice } from '../invoices/entities/invoice.entity';
export declare class PaymentsService {
    private paymentRepository;
    private invoiceRepository;
    constructor(paymentRepository: Repository<Payment>, invoiceRepository: Repository<Invoice>);
    create(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    findAll(): Promise<Payment[]>;
    findOne(id: string): Promise<Payment>;
    update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

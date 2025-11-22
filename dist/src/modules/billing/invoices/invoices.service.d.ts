import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
export declare class InvoicesService {
    private invoicesRepository;
    constructor(invoicesRepository: Repository<Invoice>);
    create(createInvoiceDto: CreateInvoiceDto): Promise<{
        success: boolean;
        message: string;
        data: Invoice;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: Invoice[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: Invoice;
    }>;
    update(id: string, updateInvoiceDto: UpdateInvoiceDto): Promise<{
        success: boolean;
        message: string;
        data: Invoice;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}

import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    create(createInvoiceDto: CreateInvoiceDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/invoice.entity").Invoice;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/invoice.entity").Invoice[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/invoice.entity").Invoice;
    }>;
    update(id: string, updateInvoiceDto: UpdateInvoiceDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/invoice.entity").Invoice;
    }>;
    remove(id: string): Promise<void>;
}

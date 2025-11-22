import { InvoiceItemsService } from './invoice-items.service';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
export declare class InvoiceItemsController {
    private readonly invoiceItemsService;
    constructor(invoiceItemsService: InvoiceItemsService);
    create(dto: CreateInvoiceItemDto): Promise<import("./entities/invoice-item.entity").InvoiceItem>;
    findAll(): Promise<import("./entities/invoice-item.entity").InvoiceItem[]>;
    findOne(id: string): Promise<import("./entities/invoice-item.entity").InvoiceItem>;
    update(id: string, dto: Partial<CreateInvoiceItemDto>): Promise<import("./entities/invoice-item.entity").InvoiceItem>;
    remove(id: string): Promise<void>;
}

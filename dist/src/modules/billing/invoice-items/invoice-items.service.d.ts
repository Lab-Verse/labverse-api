import { Repository } from 'typeorm';
import { InvoiceItem } from './entities/invoice-item.entity';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
export declare class InvoiceItemsService {
    private readonly invoiceItemRepository;
    constructor(invoiceItemRepository: Repository<InvoiceItem>);
    create(dto: CreateInvoiceItemDto): Promise<InvoiceItem>;
    findAll(): Promise<InvoiceItem[]>;
    findOne(id: string): Promise<InvoiceItem>;
    update(id: string, dto: Partial<CreateInvoiceItemDto>): Promise<InvoiceItem>;
    remove(id: string): Promise<void>;
}

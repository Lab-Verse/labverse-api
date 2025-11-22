import { CreateInvoiceItemDto } from './create-invoice-item.dto';
declare const UpdateInvoiceItemDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateInvoiceItemDto>>;
export declare class UpdateInvoiceItemDto extends UpdateInvoiceItemDto_base {
    invoiceId?: string;
    serviceId?: string;
    description?: string;
    quantity?: number;
    unitPrice?: number;
    totalPrice?: number;
}
export {};

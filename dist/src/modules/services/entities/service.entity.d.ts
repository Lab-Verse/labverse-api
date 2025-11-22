import { DevelopmentPlanService } from '../../development/development-plan-services/entities/development-plan-service.entity';
import { InvoiceItem } from '../../billing/invoice-items/entities/invoice-item.entity';
export declare class Service {
    id: string;
    name: string;
    description: string;
    base_price: number;
    duration_in_days: number;
    category: string;
    created_at: Date;
    updated_at: Date;
    developmentPlanServices: DevelopmentPlanService[];
    invoiceItems: InvoiceItem[];
}

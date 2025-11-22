import { ClientPlanQuotationStatus } from '../enums/client-plan-quotation-status.enum';
export declare class CreateClientPlanQuotationDto {
    client_id: string;
    plan_id?: string;
    status?: ClientPlanQuotationStatus;
    discount_percent?: number;
    notes?: string;
    total_amount?: number;
    created_by?: string;
}

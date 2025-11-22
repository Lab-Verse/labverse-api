import { ClientPlanQuotationsService } from './client-plan-quotations.service';
import { CreateClientPlanQuotationDto } from './dto/create-client-plan-quotation.dto';
import { UpdateClientPlanQuotationDto } from './dto/update-client-plan-quotation.dto';
export declare class ClientPlanQuotationsController {
    private readonly quotationsService;
    constructor(quotationsService: ClientPlanQuotationsService);
    create(createDto: CreateClientPlanQuotationDto): Promise<import("./entities/client-plan-quotation.entity").ClientPlanQuotation>;
    findAll(): Promise<import("./entities/client-plan-quotation.entity").ClientPlanQuotation[]>;
    findOne(id: string): Promise<import("./entities/client-plan-quotation.entity").ClientPlanQuotation>;
    update(id: string, updateDto: UpdateClientPlanQuotationDto): Promise<import("./entities/client-plan-quotation.entity").ClientPlanQuotation>;
    remove(id: string): Promise<void>;
}

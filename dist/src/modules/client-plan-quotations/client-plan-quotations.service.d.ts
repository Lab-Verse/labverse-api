import { Repository } from 'typeorm';
import { ClientPlanQuotation } from './entities/client-plan-quotation.entity';
import { CreateClientPlanQuotationDto } from './dto/create-client-plan-quotation.dto';
import { UpdateClientPlanQuotationDto } from './dto/update-client-plan-quotation.dto';
export declare class ClientPlanQuotationsService {
    private clientPlanQuotationsRepository;
    constructor(clientPlanQuotationsRepository: Repository<ClientPlanQuotation>);
    create(createDto: CreateClientPlanQuotationDto): Promise<ClientPlanQuotation>;
    findAll(): Promise<ClientPlanQuotation[]>;
    findOne(id: string): Promise<ClientPlanQuotation>;
    update(id: string, updateDto: UpdateClientPlanQuotationDto): Promise<ClientPlanQuotation>;
    remove(id: string): Promise<void>;
}

import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    create(createLeadDto: CreateLeadDto): Promise<import("./entities/lead.entity").Lead>;
    findAll(): Promise<import("./entities/lead.entity").Lead[]>;
    findOne(id: string): Promise<import("./entities/lead.entity").Lead>;
    update(id: string, updateLeadDto: UpdateLeadDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}

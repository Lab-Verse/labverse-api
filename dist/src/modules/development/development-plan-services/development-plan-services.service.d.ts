import { Repository } from 'typeorm';
import { DevelopmentPlanService } from './entities/development-plan-service.entity';
import { CreateDevelopmentPlanServiceDto } from './dto/create-development-plan-service.dto';
import { UpdateDevelopmentPlanServiceDto } from './dto/update-development-plan-service.dto';
export declare class DevelopmentPlanServicesService {
    private dpsRepository;
    constructor(dpsRepository: Repository<DevelopmentPlanService>);
    create(createDpsDto: CreateDevelopmentPlanServiceDto): Promise<DevelopmentPlanService>;
    findAll(): Promise<DevelopmentPlanService[]>;
    findOne(id: string): Promise<DevelopmentPlanService>;
    update(id: string, updateDpsDto: UpdateDevelopmentPlanServiceDto): Promise<DevelopmentPlanService>;
    remove(id: string): Promise<void>;
}

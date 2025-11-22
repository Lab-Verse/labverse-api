import { Repository } from 'typeorm';
import { DevelopmentPlan } from './entities/development-plan.entity';
import { CreateDevelopmentPlanDto } from './dto/create-development-plan.dto';
import { UpdateDevelopmentPlanDto } from './dto/update-development-plan.dto';
export declare class DevelopmentPlansService {
    private developmentPlansRepository;
    constructor(developmentPlansRepository: Repository<DevelopmentPlan>);
    create(createDevelopmentPlanDto: CreateDevelopmentPlanDto): Promise<DevelopmentPlan>;
    findAll(): Promise<DevelopmentPlan[]>;
    findOne(id: string): Promise<DevelopmentPlan>;
    update(id: string, updateDevelopmentPlanDto: UpdateDevelopmentPlanDto): Promise<DevelopmentPlan>;
    remove(id: string): Promise<void>;
}

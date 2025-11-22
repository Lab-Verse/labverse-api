import { Repository } from 'typeorm';
import { DevelopmentPlanTechnology } from './entities/development-plan-technology.entity';
import { CreateDevelopmentPlanTechnologyDto } from './dto/create-development-plan-technology.dto';
import { UpdateDevelopmentPlanTechnologyDto } from './dto/update-development-plan-technology.dto';
export declare class DevelopmentPlanTechnologiesService {
    private dptRepository;
    constructor(dptRepository: Repository<DevelopmentPlanTechnology>);
    create(createDptDto: CreateDevelopmentPlanTechnologyDto): Promise<DevelopmentPlanTechnology>;
    findAll(): Promise<DevelopmentPlanTechnology[]>;
    findOne(id: string): Promise<DevelopmentPlanTechnology>;
    update(id: string, updateDptDto: UpdateDevelopmentPlanTechnologyDto): Promise<DevelopmentPlanTechnology>;
    remove(id: string): Promise<void>;
}

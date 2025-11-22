import { DevelopmentPlanTechnologiesService } from './development-plan-technologies.service';
import { CreateDevelopmentPlanTechnologyDto } from './dto/create-development-plan-technology.dto';
import { UpdateDevelopmentPlanTechnologyDto } from './dto/update-development-plan-technology.dto';
export declare class DevelopmentPlanTechnologiesController {
    private readonly dptService;
    constructor(dptService: DevelopmentPlanTechnologiesService);
    create(createDptDto: CreateDevelopmentPlanTechnologyDto): Promise<import("./entities/development-plan-technology.entity").DevelopmentPlanTechnology>;
    findAll(): Promise<import("./entities/development-plan-technology.entity").DevelopmentPlanTechnology[]>;
    findOne(id: string): Promise<import("./entities/development-plan-technology.entity").DevelopmentPlanTechnology>;
    update(id: string, updateDptDto: UpdateDevelopmentPlanTechnologyDto): Promise<import("./entities/development-plan-technology.entity").DevelopmentPlanTechnology>;
    remove(id: string): Promise<void>;
}

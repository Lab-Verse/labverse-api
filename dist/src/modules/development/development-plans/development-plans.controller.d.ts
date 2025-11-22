import { DevelopmentPlansService } from './development-plans.service';
import { CreateDevelopmentPlanDto } from './dto/create-development-plan.dto';
import { UpdateDevelopmentPlanDto } from './dto/update-development-plan.dto';
export declare class DevelopmentPlansController {
    private readonly developmentPlansService;
    constructor(developmentPlansService: DevelopmentPlansService);
    create(createDevelopmentPlanDto: CreateDevelopmentPlanDto): Promise<import("./entities/development-plan.entity").DevelopmentPlan>;
    findAll(): Promise<import("./entities/development-plan.entity").DevelopmentPlan[]>;
    findOne(id: string): Promise<import("./entities/development-plan.entity").DevelopmentPlan>;
    update(id: string, updateDevelopmentPlanDto: UpdateDevelopmentPlanDto): Promise<import("./entities/development-plan.entity").DevelopmentPlan>;
    remove(id: string): Promise<void>;
}

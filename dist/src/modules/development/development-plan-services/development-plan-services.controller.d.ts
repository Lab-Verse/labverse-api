import { DevelopmentPlanServicesService } from './development-plan-services.service';
import { CreateDevelopmentPlanServiceDto } from './dto/create-development-plan-service.dto';
import { UpdateDevelopmentPlanServiceDto } from './dto/update-development-plan-service.dto';
export declare class DevelopmentPlanServicesController {
    private readonly dpsService;
    constructor(dpsService: DevelopmentPlanServicesService);
    create(createDpsDto: CreateDevelopmentPlanServiceDto): Promise<import("./entities/development-plan-service.entity").DevelopmentPlanService>;
    findAll(): Promise<import("./entities/development-plan-service.entity").DevelopmentPlanService[]>;
    findOne(id: string): Promise<import("./entities/development-plan-service.entity").DevelopmentPlanService>;
    update(id: string, updateDpsDto: UpdateDevelopmentPlanServiceDto): Promise<import("./entities/development-plan-service.entity").DevelopmentPlanService>;
    remove(id: string): Promise<void>;
}

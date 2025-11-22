import { DevelopmentPlanFeaturesService } from './development-plan-features.service';
import { CreateDevelopmentPlanFeatureDto } from './dto/create-development-plan-feature.dto';
import { UpdateDevelopmentPlanFeatureDto } from './dto/update-development-plan-feature.dto';
export declare class DevelopmentPlanFeaturesController {
    private readonly dpfService;
    constructor(dpfService: DevelopmentPlanFeaturesService);
    create(createDpfDto: CreateDevelopmentPlanFeatureDto): Promise<import("./entities/development-plan-feature.entity").DevelopmentPlanFeature>;
    findAll(): Promise<import("./entities/development-plan-feature.entity").DevelopmentPlanFeature[]>;
    findOne(id: string): Promise<import("./entities/development-plan-feature.entity").DevelopmentPlanFeature>;
    update(id: string, updateDpfDto: UpdateDevelopmentPlanFeatureDto): Promise<import("./entities/development-plan-feature.entity").DevelopmentPlanFeature>;
    remove(id: string): Promise<void>;
}

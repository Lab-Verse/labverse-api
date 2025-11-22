import { PlanFeaturesService } from './plan-features.service';
import { CreatePlanFeatureDto } from './dto/create-plan-feature.dto';
import { UpdatePlanFeatureDto } from './dto/update-plan-feature.dto';
export declare class PlanFeaturesController {
    private readonly planFeaturesService;
    constructor(planFeaturesService: PlanFeaturesService);
    create(createPlanFeatureDto: CreatePlanFeatureDto): Promise<import("./entities/plan-feature.entity").PlanFeature>;
    findAll(): Promise<import("./entities/plan-feature.entity").PlanFeature[]>;
    findOne(id: string): Promise<import("./entities/plan-feature.entity").PlanFeature>;
    update(id: string, updatePlanFeatureDto: UpdatePlanFeatureDto): Promise<import("./entities/plan-feature.entity").PlanFeature>;
    remove(id: string): Promise<void>;
}

import { Repository } from 'typeorm';
import { PlanFeature } from './entities/plan-feature.entity';
import { CreatePlanFeatureDto } from './dto/create-plan-feature.dto';
import { UpdatePlanFeatureDto } from './dto/update-plan-feature.dto';
export declare class PlanFeaturesService {
    private planFeaturesRepository;
    constructor(planFeaturesRepository: Repository<PlanFeature>);
    create(createPlanFeatureDto: CreatePlanFeatureDto): Promise<PlanFeature>;
    findAll(): Promise<PlanFeature[]>;
    findOne(id: string): Promise<PlanFeature>;
    update(id: string, updatePlanFeatureDto: UpdatePlanFeatureDto): Promise<PlanFeature>;
    remove(id: string): Promise<void>;
}

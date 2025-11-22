import { Repository } from 'typeorm';
import { DevelopmentPlanFeature } from './entities/development-plan-feature.entity';
import { CreateDevelopmentPlanFeatureDto } from './dto/create-development-plan-feature.dto';
import { UpdateDevelopmentPlanFeatureDto } from './dto/update-development-plan-feature.dto';
export declare class DevelopmentPlanFeaturesService {
    private dpfRepository;
    constructor(dpfRepository: Repository<DevelopmentPlanFeature>);
    create(createDpfDto: CreateDevelopmentPlanFeatureDto): Promise<DevelopmentPlanFeature>;
    findAll(): Promise<DevelopmentPlanFeature[]>;
    findOne(id: string): Promise<DevelopmentPlanFeature>;
    update(id: string, updateDpfDto: UpdateDevelopmentPlanFeatureDto): Promise<DevelopmentPlanFeature>;
    remove(id: string): Promise<void>;
}

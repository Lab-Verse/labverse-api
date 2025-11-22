import { DevelopmentPlanFeature } from '../../development/development-plan-features/entities/development-plan-feature.entity';
export declare class PlanFeature {
    id: string;
    name: string;
    description: string;
    developmentPlanFeatures: DevelopmentPlanFeature[];
}

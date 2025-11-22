import { DevelopmentPlan } from '../../development-plans/entities/development-plan.entity';
import { PlanFeature } from '../../../plan-features/entities/plan-feature.entity';
export declare class DevelopmentPlanFeature {
    id: string;
    plan_id: string;
    feature_id: string;
    plan: DevelopmentPlan;
    feature: PlanFeature;
}

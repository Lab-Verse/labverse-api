import { DevelopmentPlan } from '../../development-plans/entities/development-plan.entity';
import { Technology } from '../../../technology/entities/technology.entity';
export declare class DevelopmentPlanTechnology {
    id: string;
    plan_id: string;
    technology_id: string;
    plan: DevelopmentPlan;
    technology: Technology;
}

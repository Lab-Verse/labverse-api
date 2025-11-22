import { DevelopmentPlan } from '../../development-plans/entities/development-plan.entity';
import { Service } from '../../../services/entities/service.entity';
export declare class DevelopmentPlanService {
    id: string;
    plan_id: string;
    service_id: string;
    plan: DevelopmentPlan;
    service: Service;
}

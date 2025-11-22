import { DevelopmentPlanFeature } from '../../development-plan-features/entities/development-plan-feature.entity';
import { DevelopmentPlanService } from '../../development-plan-services/entities/development-plan-service.entity';
import { DevelopmentPlanTechnology } from '../../development-plan-technologies/entities/development-plan-technology.entity';
import { ClientPlanQuotation } from '../../../client-plan-quotations/entities/client-plan-quotation.entity';
export declare class DevelopmentPlan {
    id: string;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    developmentPlanFeatures: DevelopmentPlanFeature[];
    developmentPlanServices: DevelopmentPlanService[];
    developmentPlanTechnologies: DevelopmentPlanTechnology[];
    clientPlanQuotations: ClientPlanQuotation[];
}

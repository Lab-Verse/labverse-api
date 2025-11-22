import { DevelopmentPlanTechnology } from '../../development/development-plan-technologies/entities/development-plan-technology.entity';
export declare class Technology {
    id: string;
    name: string;
    description: string;
    category: string;
    logo: string;
    createdAt: Date;
    updatedAt: Date;
    developmentPlanTechnologies: DevelopmentPlanTechnology[];
}

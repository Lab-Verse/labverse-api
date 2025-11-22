import { ClientPlanQuotation } from '../../../client-plan-quotations/entities/client-plan-quotation.entity';
import { Invoice } from '../../../billing/invoices/entities/invoice.entity';
import { Project } from '../../../project-management/projects/entities/projects.entity';
export declare class Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    address: string;
    website: string;
    profilePhoto: string;
    created_at: Date;
    updated_at: Date;
    clientPlanQuotations: ClientPlanQuotation[];
    invoices: Invoice[];
    projects: Project[];
}

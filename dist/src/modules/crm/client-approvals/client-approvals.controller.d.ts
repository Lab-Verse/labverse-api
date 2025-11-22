import { ClientApprovalsService } from './client-approvals.service';
import { CreateClientApprovalDto } from './dto/create-client-approval.dto';
import { UpdateClientApprovalDto } from './dto/update-client-approval.dto';
export declare class ClientApprovalsController {
    private readonly clientApprovalsService;
    constructor(clientApprovalsService: ClientApprovalsService);
    createApproval(createClientApprovalDto: CreateClientApprovalDto): Promise<import("./entities/client-approval.entity").ClientApproval>;
    findAllApprovals(): Promise<import("./entities/client-approval.entity").ClientApproval[]>;
    findApprovalsByClient(clientId: string): Promise<import("./entities/client-approval.entity").ClientApproval[]>;
    findApprovalById(id: string): Promise<import("./entities/client-approval.entity").ClientApproval>;
    respondToApproval(id: string, updateClientApprovalDto: UpdateClientApprovalDto): Promise<import("./entities/client-approval.entity").ClientApproval>;
    deleteApproval(id: string): Promise<{
        message: string;
    }>;
}

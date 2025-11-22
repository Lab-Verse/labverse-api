import { Repository } from 'typeorm';
import { ClientApproval } from './entities/client-approval.entity';
import { CreateClientApprovalDto } from './dto/create-client-approval.dto';
import { UpdateClientApprovalDto } from './dto/update-client-approval.dto';
export declare class ClientApprovalsService {
    private approvalRepository;
    constructor(approvalRepository: Repository<ClientApproval>);
    createApproval(createClientApprovalDto: CreateClientApprovalDto): Promise<ClientApproval>;
    findAllApprovals(): Promise<ClientApproval[]>;
    findApprovalsByClient(clientId: string): Promise<ClientApproval[]>;
    findApprovalById(id: string): Promise<ClientApproval>;
    respondToApproval(id: string, updateClientApprovalDto: UpdateClientApprovalDto): Promise<ClientApproval>;
    deleteApproval(id: string): Promise<void>;
}

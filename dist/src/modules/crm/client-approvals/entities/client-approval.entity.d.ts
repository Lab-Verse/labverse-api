export declare enum ApprovalStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class ClientApproval {
    id: string;
    clientId: string;
    deliverableId: string;
    requestDetails: string;
    status: ApprovalStatus;
    responseNotes: string;
    requestedAt: Date;
    respondedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

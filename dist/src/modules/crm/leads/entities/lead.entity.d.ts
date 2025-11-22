export declare enum LeadStatus {
    NEW = "New",
    CONTACTED = "Contacted",
    QUALIFIED = "Qualified",
    PROPOSAL = "Proposal",
    NEGOTIATION = "Negotiation",
    CLOSED_WON = "Closed Won",
    CLOSED_LOST = "Closed Lost"
}
export declare class Lead {
    id: string;
    companyName: string;
    contactPersonName: string;
    email: string;
    phoneNumber: string;
    notes: string;
    status: LeadStatus;
    assignedTo: string;
    createdAt: Date;
    updatedAt: Date;
}

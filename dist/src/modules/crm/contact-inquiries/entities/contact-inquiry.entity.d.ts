export declare enum ContactInquiryStatus {
    NEW = "New",
    IN_PROGRESS = "In Progress",
    RESOLVED = "Resolved",
    CLOSED = "Closed"
}
export declare class ContactInquiry {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    subject: string;
    message: string;
    status: ContactInquiryStatus;
    createdAt: Date;
    updatedAt: Date;
}

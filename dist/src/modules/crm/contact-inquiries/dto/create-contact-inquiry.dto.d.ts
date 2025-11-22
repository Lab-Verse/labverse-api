import { ContactInquiryStatus } from '../entities/contact-inquiry.entity';
export declare class CreateContactInquiryDto {
    fullName: string;
    email: string;
    phoneNumber?: string;
    subject?: string;
    message: string;
    status?: ContactInquiryStatus;
}

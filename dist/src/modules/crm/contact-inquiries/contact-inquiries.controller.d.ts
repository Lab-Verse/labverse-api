import { ContactInquiriesService } from './contact-inquiries.service';
import { CreateContactInquiryDto } from './dto/create-contact-inquiry.dto';
import { UpdateContactInquiryDto } from './dto/update-contact-inquiry.dto';
export declare class ContactInquiriesController {
    private readonly contactInquiriesService;
    constructor(contactInquiriesService: ContactInquiriesService);
    create(createContactInquiryDto: CreateContactInquiryDto): Promise<import("./entities/contact-inquiry.entity").ContactInquiry>;
    findAll(): Promise<import("./entities/contact-inquiry.entity").ContactInquiry[]>;
    findOne(id: string): Promise<import("./entities/contact-inquiry.entity").ContactInquiry>;
    update(id: string, updateContactInquiryDto: UpdateContactInquiryDto): Promise<import("./entities/contact-inquiry.entity").ContactInquiry>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

import { Repository } from 'typeorm';
import { ContactInquiry } from './entities/contact-inquiry.entity';
import { CreateContactInquiryDto } from './dto/create-contact-inquiry.dto';
import { UpdateContactInquiryDto } from './dto/update-contact-inquiry.dto';
export declare class ContactInquiriesService {
    private contactInquiryRepository;
    constructor(contactInquiryRepository: Repository<ContactInquiry>);
    create(createContactInquiryDto: CreateContactInquiryDto): Promise<ContactInquiry>;
    findAll(): Promise<ContactInquiry[]>;
    findOne(id: string): Promise<ContactInquiry>;
    update(id: string, updateContactInquiryDto: UpdateContactInquiryDto): Promise<ContactInquiry>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

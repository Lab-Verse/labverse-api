import { Repository } from 'typeorm';
import { CaseStudy } from './entities/case-study.entity';
import { CreateCaseStudyDto } from './dto/create-case-study.dto';
import { UpdateCaseStudyDto } from './dto/update-case-study.dto';
export declare class CaseStudiesService {
    private caseStudyRepository;
    constructor(caseStudyRepository: Repository<CaseStudy>);
    create(createCaseStudyDto: CreateCaseStudyDto): Promise<CaseStudy>;
    findAll(): Promise<CaseStudy[]>;
    findOne(id: string): Promise<CaseStudy>;
    update(id: string, updateCaseStudyDto: UpdateCaseStudyDto): Promise<CaseStudy>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

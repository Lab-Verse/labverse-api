import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
export declare class AnswersService {
    private answerRepository;
    constructor(answerRepository: Repository<Answer>);
    create(createAnswerDto: CreateAnswerDto): Promise<Answer>;
    findAll(): Promise<Answer[]>;
    findOne(id: string): Promise<Answer>;
    update(id: string, updateAnswerDto: UpdateAnswerDto): Promise<Answer>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

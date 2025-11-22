import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
export declare class AnswersController {
    private readonly answersService;
    constructor(answersService: AnswersService);
    create(createAnswerDto: CreateAnswerDto): Promise<import("./entities/answer.entity").Answer>;
    findAll(): Promise<import("./entities/answer.entity").Answer[]>;
    findOne(id: string): Promise<import("./entities/answer.entity").Answer>;
    update(id: string, updateAnswerDto: UpdateAnswerDto): Promise<import("./entities/answer.entity").Answer>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

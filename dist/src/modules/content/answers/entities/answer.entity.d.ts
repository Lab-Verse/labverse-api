import { Question } from '../../questions/entities/question.entity';
export declare class Answer {
    id: string;
    questionId: string;
    answerText: string;
    answeredBy: string;
    createdAt: Date;
    updatedAt: Date;
    question: Question;
}

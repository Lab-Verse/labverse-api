import { Category } from '../../categories/entities/category.entity';
import { Answer } from '../../answers/entities/answer.entity';
export declare class Question {
    id: string;
    questionText: string;
    askedBy: string;
    categoryId: string;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
    answers: Answer[];
}

import { Category } from '../../categories/entities/category.entity';
export declare class CaseStudy {
    id: string;
    title: string;
    slug: string;
    introduction: string;
    challenge: string;
    solution: string;
    results: string;
    clientName: string;
    thumbnailUrl: string;
    categoryId: string;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
}

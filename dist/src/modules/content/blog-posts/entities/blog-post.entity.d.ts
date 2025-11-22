import { Category } from '../../categories/entities/category.entity';
import { BlogComment } from '../../blog-comments/entities/blog-comment.entity';
export declare class BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    authorId: string;
    categoryId: string;
    thumbnailUrl: string;
    isPublished: boolean;
    publishedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
    comments: BlogComment[];
}

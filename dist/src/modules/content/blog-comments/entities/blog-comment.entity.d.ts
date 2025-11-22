import { BlogPost } from '../../blog-posts/entities/blog-post.entity';
export declare class BlogComment {
    id: string;
    postId: string;
    userId: string;
    guestName: string;
    guestEmail: string;
    commentContent: string;
    parentCommentId: string;
    isApproved: boolean;
    createdAt: Date;
    updatedAt: Date;
    blogPost: BlogPost;
    parentComment: BlogComment;
}

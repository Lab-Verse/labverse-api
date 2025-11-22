export declare class CreateBlogCommentDto {
    postId: string;
    userId?: string;
    guestName?: string;
    guestEmail?: string;
    commentContent: string;
    parentCommentId?: string;
}

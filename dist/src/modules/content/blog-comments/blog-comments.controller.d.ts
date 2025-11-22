import { BlogCommentsService } from './blog-comments.service';
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto';
import { UpdateBlogCommentDto } from './dto/update-blog-comment.dto';
export declare class BlogCommentsController {
    private readonly blogCommentsService;
    constructor(blogCommentsService: BlogCommentsService);
    create(createBlogCommentDto: CreateBlogCommentDto): Promise<import("./entities/blog-comment.entity").BlogComment>;
    findAll(): Promise<import("./entities/blog-comment.entity").BlogComment[]>;
    findOne(id: string): Promise<import("./entities/blog-comment.entity").BlogComment>;
    update(id: string, updateBlogCommentDto: UpdateBlogCommentDto): Promise<import("./entities/blog-comment.entity").BlogComment>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

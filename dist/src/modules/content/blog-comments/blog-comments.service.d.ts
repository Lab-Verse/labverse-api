import { Repository } from 'typeorm';
import { BlogComment } from './entities/blog-comment.entity';
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto';
import { UpdateBlogCommentDto } from './dto/update-blog-comment.dto';
export declare class BlogCommentsService {
    private blogCommentRepository;
    constructor(blogCommentRepository: Repository<BlogComment>);
    create(createBlogCommentDto: CreateBlogCommentDto): Promise<BlogComment>;
    findAll(): Promise<BlogComment[]>;
    findOne(id: string): Promise<BlogComment>;
    update(id: string, updateBlogCommentDto: UpdateBlogCommentDto): Promise<BlogComment>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

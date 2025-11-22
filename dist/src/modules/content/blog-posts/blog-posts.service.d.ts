import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
export declare class BlogPostsService {
    private blogPostRepository;
    constructor(blogPostRepository: Repository<BlogPost>);
    create(createBlogPostDto: CreateBlogPostDto): Promise<BlogPost>;
    findAll(): Promise<BlogPost[]>;
    findOne(id: string): Promise<BlogPost>;
    update(id: string, updateBlogPostDto: UpdateBlogPostDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}

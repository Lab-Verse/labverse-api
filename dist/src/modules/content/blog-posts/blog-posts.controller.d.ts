import { BlogPostsService } from './blog-posts.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
export declare class BlogPostsController {
    private readonly blogPostsService;
    constructor(blogPostsService: BlogPostsService);
    create(createBlogPostDto: CreateBlogPostDto): Promise<import("./entities/blog-post.entity").BlogPost>;
    findAll(): Promise<import("./entities/blog-post.entity").BlogPost[]>;
    findOne(id: string): Promise<import("./entities/blog-post.entity").BlogPost>;
    update(id: string, updateBlogPostDto: UpdateBlogPostDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}

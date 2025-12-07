import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { StorageService } from '../../../common/services/storage.service';

@Injectable()
export class BlogPostsService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostRepository: Repository<BlogPost>,
    private storageService: StorageService,
  ) {}

  async create(createBlogPostDto: CreateBlogPostDto, thumbnail?: Express.Multer.File): Promise<BlogPost> {
    let thumbnailUrl: string = '';
    
    if (thumbnail) {
      const thumbnailUrls = await this.storageService.uploadFiles([thumbnail], {
        folder: 'blog-posts/thumbnails',
        maxFiles: 1,
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      });
      thumbnailUrl = thumbnailUrls[0];
    }

    const blogPost = this.blogPostRepository.create({
      ...createBlogPostDto,
      thumbnailUrl: thumbnailUrl || createBlogPostDto.thumbnailUrl,
    });
    return this.blogPostRepository.save(blogPost);
  }

  findAll() {
    return this.blogPostRepository.find({ relations: ['category'] });
  }

  async findOne(id: string): Promise<BlogPost> {
    const blogPost = await this.blogPostRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!blogPost) {
      throw new NotFoundException(`Blog post with ID "${id}" not found.`);
    }
    return blogPost;
  }

  async update(id: string, updateBlogPostDto: UpdateBlogPostDto, thumbnail?: Express.Multer.File): Promise<BlogPost> {
    const existingBlogPost = await this.findOne(id);
    
    let updateData = { ...updateBlogPostDto };
    
    if (thumbnail) {
      // Replace old thumbnail with new one
      const oldThumbnail = existingBlogPost.thumbnailUrl ? [existingBlogPost.thumbnailUrl] : [];
      const thumbnailUrls = await this.storageService.replaceFiles(
        oldThumbnail,
        [thumbnail],
        {
          folder: 'blog-posts/thumbnails',
          maxFiles: 1,
          allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
        }
      );
      updateData.thumbnailUrl = thumbnailUrls[0];
    }
    
    await this.blogPostRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{ message: string }> {
    const blogPost = await this.findOne(id);
    
    // Delete thumbnail from storage
    if (blogPost.thumbnailUrl) {
      await this.storageService.deleteFiles([blogPost.thumbnailUrl]);
    }
    
    await this.blogPostRepository.delete(id);
    return { message: 'Blog post successfully deleted' };
  }
}

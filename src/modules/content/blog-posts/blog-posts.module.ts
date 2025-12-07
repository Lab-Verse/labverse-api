import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPostsService } from './blog-posts.service';
import { BlogPostsController } from './blog-posts.controller';
import { BlogPost } from './entities/blog-post.entity';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost]), SharedModule],
  controllers: [BlogPostsController],
  providers: [BlogPostsService],
  exports: [BlogPostsService],
})
export class BlogPostsModule {}

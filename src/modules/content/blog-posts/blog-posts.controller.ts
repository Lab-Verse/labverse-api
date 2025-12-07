import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { BlogPostsService } from './blog-posts.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
@ApiTags('Blog Posts')
@Controller('blog-posts')
export class BlogPostsController {
  constructor(private readonly blogPostsService: BlogPostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'thumbnail', maxCount: 1 }]))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Getting Started with NestJS' },
        slug: { type: 'string', example: 'getting-started-with-nestjs' },
        content: { type: 'string', example: 'NestJS is a progressive Node.js framework...' },
        authorId: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' },
        categoryId: { type: 'string', format: 'uuid', example: '11111111-1111-1111-1111-111111111111' },
        isPublished: { type: 'boolean', example: true },
        thumbnail: {
          type: 'string',
          format: 'binary',
          description: 'Thumbnail image file'
        }
      },
      required: ['title', 'slug', 'content']
    }
  })
  create(
    @Body() createBlogPostDto: CreateBlogPostDto,
    @UploadedFiles() files: { thumbnail?: Express.Multer.File[] },
  ) {
    return this.blogPostsService.create(createBlogPostDto, files?.thumbnail?.[0]);
  }

  @Get()
  @ApiOperation({ summary: 'get all blog posts' })
  findAll() {
    return this.blogPostsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get a blog post by id' })
  findOne(@Param('id') id: string) {
    return this.blogPostsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'thumbnail', maxCount: 1 }]))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'update a blog post by id' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Updated Blog Post Title' },
        slug: { type: 'string', example: 'updated-blog-post-slug' },
        content: { type: 'string', example: 'Updated blog post content...' },
        authorId: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' },
        categoryId: { type: 'string', format: 'uuid', example: '11111111-1111-1111-1111-111111111111' },
        isPublished: { type: 'boolean', example: true },
        thumbnail: {
          type: 'string',
          format: 'binary',
          description: 'New thumbnail image file'
        }
      }
    }
  })
  update(
    @Param('id') id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
    @UploadedFiles() files: { thumbnail?: Express.Multer.File[] },
  ) {
    return this.blogPostsService.update(id, updateBlogPostDto, files?.thumbnail?.[0]);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'delete a blog post by id' })
  remove(@Param('id') id: string) {
    return this.blogPostsService.remove(id);
  }
}

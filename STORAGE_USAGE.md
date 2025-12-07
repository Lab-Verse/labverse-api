# Storage Service Usage Guide

## Overview
The `StorageService` provides a unified interface for file uploads, updates, and deletions across all modules using Cloudflare R2 storage.

## Setup
1. Add `SharedModule` to your module imports
2. Inject `StorageService` in your service
3. Use `FilesInterceptor` in your controller

## Example Implementation

### 1. Module Setup
```typescript
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([YourEntity]), SharedModule],
  // ...
})
```

### 2. Controller Setup
```typescript
import { FilesInterceptor } from '@nestjs/platform-express';

@Post()
@UseInterceptors(FilesInterceptor('images', 5)) // field name, max files
create(
  @Body() dto: CreateDto,
  @UploadedFiles() images?: Express.Multer.File[],
) {
  return this.service.create(dto, images);
}
```

### 3. Service Implementation
```typescript
import { StorageService } from '../../../common/services/storage.service';

constructor(private storageService: StorageService) {}

async create(dto: CreateDto, files?: Express.Multer.File[]) {
  let imageUrls: string[] = [];
  if (files?.length > 0) {
    imageUrls = await this.storageService.uploadFiles(files, {
      folder: 'your-folder',
      maxFiles: 5,
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
    });
  }
  // Save entity with imageUrls
}

async update(id: string, dto: UpdateDto, files?: Express.Multer.File[]) {
  const existing = await this.findOne(id);
  
  if (files?.length > 0) {
    const imageUrls = await this.storageService.replaceFiles(
      existing.images || [],
      files,
      { folder: 'your-folder', maxFiles: 5 }
    );
    dto.images = imageUrls;
  }
  // Update entity
}

async remove(id: string) {
  const entity = await this.findOne(id);
  
  if (entity.images?.length > 0) {
    await this.storageService.deleteFiles(entity.images);
  }
  
  return this.repository.delete(id);
}
```

## Storage Configuration Options
- `folder`: Storage folder name (e.g., 'blog-posts', 'case-studies')
- `maxFiles`: Maximum number of files allowed
- `allowedTypes`: Array of allowed MIME types

## Supported File Types
- Images: 'image/jpeg', 'image/png', 'image/webp', 'image/gif'
- Documents: 'application/pdf', 'text/plain'
- Add more as needed in your configuration
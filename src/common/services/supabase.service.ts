import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SafeLogger } from 'src/common/utils/logger.util';
import { FileUploadService } from './file-upload.service';

@Injectable()
export class SupabaseService {
  constructor(
    private configService: ConfigService,
    private fileUploadService: FileUploadService,
  ) {}

  async uploadImage(
    file: Express.Multer.File,
    folderName: string,
  ): Promise<string> {
    try {
      // Validate file exists
      if (!file) {
        throw new BadRequestException('No file provided');
      }

      // Validate file size (2MB = 2 * 1024 * 1024 bytes)
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes

      if (file.size > maxSize) {
        throw new BadRequestException('Image size must be 2MB or less');
      }

      // Validate file type
      const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
      ];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          'Only JPEG, PNG, WebP, and GIF images are allowed',
        );
      }

      // Upload using Cloudflare R2
      const imageUrl = await this.fileUploadService.uploadSingleFile(file, folderName);
      
      SafeLogger.log(
        `Image uploaded successfully to: ${imageUrl}`,
        'SupabaseService',
      );
      return imageUrl;
    } catch (error) {
      SafeLogger.error(
        `Image upload failed: ${error.message}`,
        'SupabaseService',
      );

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to upload image');
    }
  }

  /**
   * Delete image from Cloudflare R2 storage
   */
  async deleteImage(imageUrl: string): Promise<void> {
    try {
      if (!imageUrl) {
        throw new BadRequestException('Image URL is required');
      }

      await this.fileUploadService.deleteFile(imageUrl);
      
      SafeLogger.log(
        `Image deleted successfully: ${imageUrl}`,
        'SupabaseService',
      );
    } catch (error) {
      SafeLogger.error(
        `Image deletion failed: ${error.message}`,
        'SupabaseService',
      );

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete image');
    }
  }

  async testConnection(): Promise<void> {
    try {
      SafeLogger.log(
        `Using Cloudflare R2 storage with bucket: ${this.configService.get<string>('CLOUDFLARE_BUCKET_NAME')}`,
        'SupabaseService',
      );
    } catch (error) {
      SafeLogger.error(
        `Connection test error: ${error.message}`,
        'SupabaseService',
      );
    }
  }
}

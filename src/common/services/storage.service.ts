import { Injectable } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';

export interface StorageConfig {
  folder: string;
  maxFiles?: number;
  allowedTypes?: string[];
}

@Injectable()
export class StorageService {
  constructor(private fileUploadService: FileUploadService) {}

  async uploadFiles(files: Express.Multer.File[], config: StorageConfig): Promise<string[]> {
    this.validateFiles(files, config);
    return this.fileUploadService.uploadFiles(files, config.folder);
  }

  async replaceFiles(oldUrls: string[], newFiles: Express.Multer.File[], config: StorageConfig): Promise<string[]> {
    this.validateFiles(newFiles, config);
    return this.fileUploadService.replaceFiles(oldUrls, newFiles, config.folder);
  }

  async deleteFiles(fileUrls: string[]): Promise<void> {
    return this.fileUploadService.deleteFiles(fileUrls);
  }

  private validateFiles(files: Express.Multer.File[], config: StorageConfig): void {
    if (config.maxFiles && files.length > config.maxFiles) {
      throw new Error(`Maximum ${config.maxFiles} files allowed`);
    }

    if (config.allowedTypes) {
      const invalidFiles = files.filter(file => !config.allowedTypes.includes(file.mimetype));
      if (invalidFiles.length > 0) {
        throw new Error(`Invalid file types. Allowed: ${config.allowedTypes.join(', ')}`);
      }
    }
  }
}
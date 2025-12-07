import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileUploadService {
  private readonly logger = new Logger(FileUploadService.name);
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly publicUrl: string;

  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.get<string>('CLOUDFLARE_BUCKET_NAME');
    this.publicUrl = this.configService.get<string>('CLOUDFLARE_PUBLIC_URL');
    
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: this.configService.get<string>('CLOUDFLARE_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.get<string>('CLOUDFLARE_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('CLOUDFLARE_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFiles(files: Express.Multer.File[], folder: string = 'uploads'): Promise<string[]> {
    const uploadPromises = files.map(file => this.uploadSingleFile(file, folder));
    return Promise.all(uploadPromises);
  }

  async uploadSingleFile(file: Express.Multer.File, folder: string = 'uploads'): Promise<string> {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${folder}/${uuidv4()}.${fileExtension}`;
    
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      await this.s3Client.send(command);
      const fileUrl = `${this.publicUrl}/${fileName}`;
      this.logger.log(`File uploaded successfully: ${fileUrl}`);
      return fileUrl;
    } catch (error) {
      this.logger.error(`Failed to upload file: ${error.message}`);
      throw new Error(`File upload failed: ${error.message}`);
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const fileName = this.extractFileNameFromUrl(fileUrl);
      if (!fileName) return;

      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
      });

      await this.s3Client.send(command);
      this.logger.log(`File deleted successfully: ${fileName}`);
    } catch (error) {
      this.logger.error(`Failed to delete file: ${error.message}`);
    }
  }

  async deleteFiles(fileUrls: string[]): Promise<void> {
    const deletePromises = fileUrls.map(url => this.deleteFile(url));
    await Promise.all(deletePromises);
  }

  async replaceFiles(oldUrls: string[], newFiles: Express.Multer.File[], folder: string = 'uploads'): Promise<string[]> {
    // Delete old files
    if (oldUrls && oldUrls.length > 0) {
      await this.deleteFiles(oldUrls);
    }
    
    // Upload new files
    return this.uploadFiles(newFiles, folder);
  }

  private extractFileNameFromUrl(fileUrl: string): string | null {
    try {
      const url = new URL(fileUrl);
      return url.pathname.substring(1); // Remove leading slash
    } catch {
      return null;
    }
  }
}
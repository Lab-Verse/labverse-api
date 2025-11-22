import { ConfigService } from '@nestjs/config';
export declare class SupabaseService {
    private configService;
    private supabase;
    private bucketName;
    constructor(configService: ConfigService);
    uploadImage(file: Express.Multer.File, folderName: string): Promise<string>;
    deleteImage(imageUrl: string): Promise<void>;
    testConnection(): Promise<void>;
}

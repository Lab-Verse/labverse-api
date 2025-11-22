"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = require("@nestjs/config");
const logger_util_1 = require("../utils/logger.util");
let SupabaseService = class SupabaseService {
    constructor(configService) {
        this.configService = configService;
        this.supabase = (0, supabase_js_1.createClient)(this.configService.get('SUPABASE_URL'), this.configService.get('SUPABASE_SERVICE_ROLE_KEY') ||
            this.configService.get('SUPABASE_ANON_KEY'));
        this.bucketName = this.configService.get('SUPABASE_BUCKET_NAME');
    }
    async uploadImage(file, folderName) {
        try {
            await this.testConnection();
            if (!file) {
                throw new common_1.BadRequestException('No file provided');
            }
            const maxSize = 2 * 1024 * 1024;
            if (file.size > maxSize) {
                throw new common_1.BadRequestException('Image size must be 2MB or less');
            }
            const allowedMimeTypes = [
                'image/jpeg',
                'image/png',
                'image/webp',
                'image/gif',
            ];
            if (!allowedMimeTypes.includes(file.mimetype)) {
                throw new common_1.BadRequestException('Only JPEG, PNG, WebP, and GIF images are allowed');
            }
            const fileExtension = file.originalname.split('.').pop();
            const fileName = `${folderName}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
            const { error } = await this.supabase.storage
                .from(this.bucketName)
                .upload(fileName, file.buffer, {
                cacheControl: '3600',
                upsert: false,
                contentType: file.mimetype,
            });
            if (error) {
                logger_util_1.SafeLogger.error(`Supabase upload error details: ${JSON.stringify(error)}`, 'SupabaseService');
                logger_util_1.SafeLogger.error(`Bucket: ${this.bucketName}, FileName: ${fileName}`, 'SupabaseService');
                logger_util_1.SafeLogger.error(`Supabase URL: ${this.configService.get('SUPABASE_URL')}`, 'SupabaseService');
                throw new common_1.InternalServerErrorException(`Failed to upload image to Supabase: ${error.message || 'Unknown error'}`);
            }
            const { data: publicUrlData } = this.supabase.storage
                .from(this.bucketName)
                .getPublicUrl(fileName);
            logger_util_1.SafeLogger.log(`Image uploaded successfully to: ${publicUrlData.publicUrl}`, 'SupabaseService');
            return publicUrlData.publicUrl;
        }
        catch (error) {
            logger_util_1.SafeLogger.error(`Image upload failed: ${error.message}`, 'SupabaseService');
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to upload image');
        }
    }
    async deleteImage(imageUrl) {
        try {
            if (!imageUrl) {
                throw new common_1.BadRequestException('Image URL is required');
            }
            const urlParts = imageUrl.split('/');
            const fileName = urlParts.slice(-2).join('/');
            const { error } = await this.supabase.storage
                .from(this.bucketName)
                .remove([fileName]);
            if (error) {
                logger_util_1.SafeLogger.error(`Failed to delete image: ${error.message}`, 'SupabaseService');
                throw new common_1.InternalServerErrorException('Failed to delete image from storage');
            }
            logger_util_1.SafeLogger.log(`Image deleted successfully: ${fileName}`, 'SupabaseService');
        }
        catch (error) {
            logger_util_1.SafeLogger.error(`Image deletion failed: ${error.message}`, 'SupabaseService');
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to delete image');
        }
    }
    async testConnection() {
        try {
            const { data, error } = await this.supabase.storage.listBuckets();
            if (error) {
                logger_util_1.SafeLogger.error(`Supabase connection test failed: ${error.message}`, 'SupabaseService');
            }
            else {
                logger_util_1.SafeLogger.log(`Available buckets: ${data.map((b) => b.name).join(', ')}`, 'SupabaseService');
            }
        }
        catch (error) {
            logger_util_1.SafeLogger.error(`Connection test error: ${error.message}`, 'SupabaseService');
        }
    }
};
exports.SupabaseService = SupabaseService;
exports.SupabaseService = SupabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SupabaseService);
//# sourceMappingURL=supabase.service.js.map
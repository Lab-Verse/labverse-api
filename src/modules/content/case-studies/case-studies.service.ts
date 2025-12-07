import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseStudy } from './entities/case-study.entity';
import { CreateCaseStudyDto } from './dto/create-case-study.dto';
import { UpdateCaseStudyDto } from './dto/update-case-study.dto';
import { SecurityUtil } from '../../../common/utils/security.util';
import { StorageService } from '../../../common/services/storage.service';

@Injectable()
export class CaseStudiesService {
  constructor(
    @InjectRepository(CaseStudy)
    private caseStudyRepository: Repository<CaseStudy>,
    private storageService: StorageService,
  ) {}

  async create(
    createCaseStudyDto: CreateCaseStudyDto,
    projectImages?: Express.Multer.File[],
    thumbnail?: Express.Multer.File,
  ): Promise<CaseStudy> {
    try {
      SecurityUtil.validateObject(createCaseStudyDto);
      const sanitizedSlug = SecurityUtil.sanitizeString(
        createCaseStudyDto.slug,
      );
      const existingSlug = await this.caseStudyRepository.findOne({
        where: { slug: sanitizedSlug },
      });
      if (existingSlug) {
        throw new ConflictException(
          `Case study with slug "${createCaseStudyDto.slug}" already exists.`,
        );
      }

      let imageUrls: string[] = [];
      let thumbnailUrl: string = '';
      
      if (projectImages && projectImages.length > 0) {
        imageUrls = await this.storageService.uploadFiles(projectImages, {
          folder: 'case-studies',
          maxFiles: 10,
          allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
        });
      }
      
      if (thumbnail) {
        const thumbnailUrls = await this.storageService.uploadFiles([thumbnail], {
          folder: 'case-studies/thumbnails',
          maxFiles: 1,
          allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
        });
        thumbnailUrl = thumbnailUrls[0];
      }

      const caseStudy = this.caseStudyRepository.create({
        ...createCaseStudyDto,
        projectImages: imageUrls,
        thumbnailUrl: thumbnailUrl || createCaseStudyDto.thumbnailUrl,
      });
      return await this.caseStudyRepository.save(caseStudy);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      if (error.code === '23503') {
        throw new NotFoundException('Category not found.');
      }
      throw error;
    }
  }

  async findAll(): Promise<CaseStudy[]> {
    return this.caseStudyRepository.find({ relations: ['category'] });
  }

  async findOne(id: string): Promise<CaseStudy> {
    const validId = SecurityUtil.validateId(id);
    const caseStudy = await this.caseStudyRepository.findOne({
      where: { id: validId },
      relations: ['category'],
    });
    if (!caseStudy) {
      throw new NotFoundException(`Case study with ID "${id}" not found.`);
    }
    return caseStudy;
  }

  async update(
    id: string,
    updateCaseStudyDto: UpdateCaseStudyDto,
    projectImages?: Express.Multer.File[],
    thumbnail?: Express.Multer.File,
  ): Promise<CaseStudy> {
    try {
      SecurityUtil.validateObject(updateCaseStudyDto);
      if (updateCaseStudyDto.slug) {
        const sanitizedSlug = SecurityUtil.sanitizeString(
          updateCaseStudyDto.slug,
        );
        const existingSlug = await this.caseStudyRepository.findOne({
          where: { slug: sanitizedSlug },
        });
        if (existingSlug && existingSlug.id !== id) {
          throw new ConflictException(
            `Case study with slug "${updateCaseStudyDto.slug}" already exists.`,
          );
        }
      }

      const validId = SecurityUtil.validateId(id);
      const existingCaseStudy = await this.findOne(id);
      
      let updateData = { ...updateCaseStudyDto };
      
      if (projectImages && projectImages.length > 0) {
        // Replace old images with new ones
        const imageUrls = await this.storageService.replaceFiles(
          existingCaseStudy.projectImages || [],
          projectImages,
          {
            folder: 'case-studies',
            maxFiles: 10,
            allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
          }
        );
        updateData.projectImages = imageUrls;
      }
      
      if (thumbnail) {
        // Replace old thumbnail with new one
        const oldThumbnail = existingCaseStudy.thumbnailUrl ? [existingCaseStudy.thumbnailUrl] : [];
        const thumbnailUrls = await this.storageService.replaceFiles(
          oldThumbnail,
          [thumbnail],
          {
            folder: 'case-studies/thumbnails',
            maxFiles: 1,
            allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
          }
        );
        updateData.thumbnailUrl = thumbnailUrls[0];
      }
      
      await this.caseStudyRepository.update(validId, updateData);
      return this.findOne(id);
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      if (error.code === '23503') {
        throw new NotFoundException('Category not found.');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    const validId = SecurityUtil.validateId(id);
    const caseStudy = await this.findOne(id);
    
    // Delete associated images from storage
    const filesToDelete = [];
    if (caseStudy.projectImages && caseStudy.projectImages.length > 0) {
      filesToDelete.push(...caseStudy.projectImages);
    }
    if (caseStudy.thumbnailUrl) {
      filesToDelete.push(caseStudy.thumbnailUrl);
    }
    if (filesToDelete.length > 0) {
      await this.storageService.deleteFiles(filesToDelete);
    }
    
    const result = await this.caseStudyRepository.delete(validId);
    if (result.affected === 0) {
      throw new NotFoundException(`Case study with ID "${id}" not found.`);
    }
    return { message: 'Case study successfully deleted' };
  }
}

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseStudiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const case_study_entity_1 = require("./entities/case-study.entity");
const security_util_1 = require("../../../common/utils/security.util");
let CaseStudiesService = class CaseStudiesService {
    constructor(caseStudyRepository) {
        this.caseStudyRepository = caseStudyRepository;
    }
    async create(createCaseStudyDto) {
        try {
            security_util_1.SecurityUtil.validateObject(createCaseStudyDto);
            const sanitizedSlug = security_util_1.SecurityUtil.sanitizeString(createCaseStudyDto.slug);
            const existingSlug = await this.caseStudyRepository.findOne({
                where: { slug: sanitizedSlug },
            });
            if (existingSlug) {
                throw new common_1.ConflictException(`Case study with slug "${createCaseStudyDto.slug}" already exists.`);
            }
            const caseStudy = this.caseStudyRepository.create(createCaseStudyDto);
            return await this.caseStudyRepository.save(caseStudy);
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            if (error.code === '23503') {
                throw new common_1.NotFoundException('Category not found.');
            }
            throw error;
        }
    }
    async findAll() {
        return this.caseStudyRepository.find({ relations: ['category'] });
    }
    async findOne(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const caseStudy = await this.caseStudyRepository.findOne({
            where: { id: validId },
            relations: ['category'],
        });
        if (!caseStudy) {
            throw new common_1.NotFoundException(`Case study with ID "${id}" not found.`);
        }
        return caseStudy;
    }
    async update(id, updateCaseStudyDto) {
        try {
            security_util_1.SecurityUtil.validateObject(updateCaseStudyDto);
            if (updateCaseStudyDto.slug) {
                const sanitizedSlug = security_util_1.SecurityUtil.sanitizeString(updateCaseStudyDto.slug);
                const existingSlug = await this.caseStudyRepository.findOne({
                    where: { slug: sanitizedSlug },
                });
                if (existingSlug && existingSlug.id !== id) {
                    throw new common_1.ConflictException(`Case study with slug "${updateCaseStudyDto.slug}" already exists.`);
                }
            }
            const validId = security_util_1.SecurityUtil.validateId(id);
            await this.caseStudyRepository.update(validId, updateCaseStudyDto);
            return this.findOne(id);
        }
        catch (error) {
            if (error instanceof common_1.ConflictException ||
                error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error.code === '23503') {
                throw new common_1.NotFoundException('Category not found.');
            }
            throw error;
        }
    }
    async remove(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const result = await this.caseStudyRepository.delete(validId);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Case study with ID "${id}" not found.`);
        }
        return { message: 'Case study successfully deleted' };
    }
};
exports.CaseStudiesService = CaseStudiesService;
exports.CaseStudiesService = CaseStudiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(case_study_entity_1.CaseStudy)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CaseStudiesService);
//# sourceMappingURL=case-studies.service.js.map
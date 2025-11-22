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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
const security_util_1 = require("../../../common/utils/security.util");
let CategoriesService = class CategoriesService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(createCategoryDto) {
        security_util_1.SecurityUtil.validateObject(createCategoryDto);
        const existingCategory = await this.categoryRepository.findOne({
            where: [
                { name: createCategoryDto.name },
                { slug: createCategoryDto.slug },
            ],
        });
        if (existingCategory) {
            throw new common_1.ConflictException('Category name or slug already exists');
        }
        const category = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(category);
    }
    async findAll() {
        return this.categoryRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const validId = security_util_1.SecurityUtil.validateId(id);
        const category = await this.categoryRepository.findOne({
            where: { id: validId },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${validId} not found`);
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        security_util_1.SecurityUtil.validateObject(updateCategoryDto);
        const validId = security_util_1.SecurityUtil.validateId(id);
        const category = await this.findOne(validId);
        if (updateCategoryDto.name || updateCategoryDto.slug) {
            const existingCategory = await this.categoryRepository.findOne({
                where: [
                    { name: updateCategoryDto.name },
                    { slug: updateCategoryDto.slug },
                ],
            });
            if (existingCategory && existingCategory.id !== validId) {
                throw new common_1.ConflictException('Category name or slug already exists');
            }
        }
        Object.assign(category, updateCategoryDto);
        return this.categoryRepository.save(category);
    }
    async remove(id) {
        const category = await this.findOne(id);
        await this.categoryRepository.remove(category);
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map
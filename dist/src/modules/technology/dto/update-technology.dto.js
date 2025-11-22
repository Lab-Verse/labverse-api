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
exports.UpdateTechnologyDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const create_technology_dto_1 = require("./create-technology.dto");
class UpdateTechnologyDto extends (0, mapped_types_1.PartialType)(create_technology_dto_1.CreateTechnologyDto) {
}
exports.UpdateTechnologyDto = UpdateTechnologyDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Updated name of the technology',
        example: 'Express.js',
        minLength: 3,
        maxLength: 100,
    }),
    __metadata("design:type", String)
], UpdateTechnologyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Updated description of the technology',
        example: 'A fast, unopinionated, minimalist web framework for Node.js.',
        maxLength: 255,
    }),
    __metadata("design:type", String)
], UpdateTechnologyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Updated category of the technology',
        example: 'Web Framework',
        maxLength: 100,
    }),
    __metadata("design:type", String)
], UpdateTechnologyDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Updated logo URL for the technology',
        example: 'https://example.com/express-logo.png',
        maxLength: 500,
    }),
    __metadata("design:type", String)
], UpdateTechnologyDto.prototype, "logo", void 0);
//# sourceMappingURL=update-technology.dto.js.map
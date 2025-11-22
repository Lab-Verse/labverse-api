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
exports.UpdateProjectTechnologyDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateProjectTechnologyDto {
}
exports.UpdateProjectTechnologyDto = UpdateProjectTechnologyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The UUID of the new technology to be associated with the project',
        example: '11111111-1111-1111-1111-111111111111',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateProjectTechnologyDto.prototype, "newTechnologyId", void 0);
//# sourceMappingURL=update-project-technology.dto.js.map
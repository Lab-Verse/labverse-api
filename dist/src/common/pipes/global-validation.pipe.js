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
exports.GlobalValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let GlobalValidationPipe = class GlobalValidationPipe extends common_1.ValidationPipe {
    constructor() {
        super({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: false,
            },
            validateCustomDecorators: true,
            exceptionFactory: (errors) => {
                const messages = this.formatErrors(errors);
                return new common_1.BadRequestException(messages);
            },
        });
    }
    formatErrors(errors) {
        const errorMessages = [];
        errors.forEach((error) => {
            if (error.constraints) {
                Object.values(error.constraints).forEach((message) => {
                    errorMessages.push(message);
                });
            }
            if (error.children && error.children.length > 0) {
                errorMessages.push(...this.formatErrors(error.children));
            }
        });
        return errorMessages;
    }
};
exports.GlobalValidationPipe = GlobalValidationPipe;
exports.GlobalValidationPipe = GlobalValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GlobalValidationPipe);
//# sourceMappingURL=global-validation.pipe.js.map
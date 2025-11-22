"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityValidationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const security_util_1 = require("../utils/security.util");
let SecurityValidationMiddleware = class SecurityValidationMiddleware {
    use(req, res, next) {
        try {
            if (req.params) {
                for (const [key, value] of Object.entries(req.params)) {
                    if (key === 'id' || key.endsWith('Id')) {
                        security_util_1.SecurityUtil.validateId(value);
                    }
                }
            }
            if (req.body && typeof req.body === 'object') {
                security_util_1.SecurityUtil.validateObject(req.body);
            }
            if (req.query && typeof req.query === 'object') {
                security_util_1.SecurityUtil.validateObject(req.query);
            }
            next();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.SecurityValidationMiddleware = SecurityValidationMiddleware;
exports.SecurityValidationMiddleware = SecurityValidationMiddleware = __decorate([
    (0, common_1.Injectable)()
], SecurityValidationMiddleware);
//# sourceMappingURL=security-validation.middleware.js.map
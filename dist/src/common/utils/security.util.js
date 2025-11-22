"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityUtil = void 0;
const common_1 = require("@nestjs/common");
class SecurityUtil {
    static sanitizeString(input) {
        if (!input || typeof input !== 'string')
            return input;
        return (input
            .replace(/[<>]/g, '')
            .replace(/['\"]/g, '')
            .replace(/[{}]/g, '')
            .replace(/[\\[\\]]/g, '')
            .replace(/\\$/g, '')
            .trim());
    }
    static validateId(id) {
        if (!id) {
            throw new common_1.BadRequestException('ID is required');
        }
        if (typeof id !== 'string') {
            throw new common_1.BadRequestException('ID must be a string');
        }
        const sanitized = id.replace(/[^a-zA-Z0-9-]/g, '');
        if (sanitized !== id) {
            throw new common_1.BadRequestException('Invalid ID format - contains illegal characters');
        }
        this.validateUUID(sanitized);
        return sanitized;
    }
    static validateObject(obj) {
        if (!obj || typeof obj !== 'object')
            return;
        const dangerousKeys = [
            '$where',
            '$regex',
            '$ne',
            '$gt',
            '$gte',
            '$lt',
            '$lte',
            '$in',
            '$nin',
            '$exists',
            '$type',
            '$or',
            '$and',
            '$not',
            '$nor',
            '$expr',
            '$jsonSchema',
            '$mod',
            '$all',
            '$elemMatch',
            '$size',
        ];
        for (const key of Object.keys(obj)) {
            if (dangerousKeys.includes(key)) {
                throw new common_1.BadRequestException(`Potentially dangerous query operator detected: ${key}`);
            }
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                this.validateObject(obj[key]);
            }
        }
    }
    static validateUUID(id) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            throw new common_1.BadRequestException('Invalid ID format');
        }
    }
    static sanitizeLogMessage(message) {
        if (!message)
            return message;
        return message
            .replace(/[\r\n]/g, '_')
            .replace(/[\t]/g, ' ')
            .replace(/[^\x20-\x7E]/g, '');
    }
    static validateEmail(email) {
        if (!email || typeof email !== 'string') {
            throw new common_1.BadRequestException('Invalid email format');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            throw new common_1.BadRequestException('Invalid email format');
        }
        return true;
    }
    static sanitizeInput(input) {
        if (!input || typeof input !== 'string') {
            return '';
        }
        return input
            .trim()
            .replace(/[<>\"'%;()&+]/g, '')
            .substring(0, 1000);
    }
    static sanitizeQueryParams(params) {
        if (!params || typeof params !== 'object')
            return params;
        const sanitized = { ...params };
        for (const key in sanitized) {
            if (typeof sanitized[key] === 'string') {
                sanitized[key] = this.sanitizeString(sanitized[key]);
            }
            else if (typeof sanitized[key] === 'object' &&
                sanitized[key] !== null) {
                this.validateObject(sanitized[key]);
            }
        }
        return sanitized;
    }
    static validateIdArray(ids) {
        if (!Array.isArray(ids)) {
            throw new common_1.BadRequestException('Expected array of IDs');
        }
        return ids.map((id) => this.validateId(id));
    }
    static validatePassword(password) {
        if (!password || typeof password !== 'string') {
            throw new common_1.BadRequestException('Password is required');
        }
        if (password.length < 8) {
            throw new common_1.BadRequestException('Password must be at least 8 characters long');
        }
        return true;
    }
}
exports.SecurityUtil = SecurityUtil;
//# sourceMappingURL=security.util.js.map
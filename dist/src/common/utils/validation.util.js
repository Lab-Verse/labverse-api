"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationUtil = void 0;
const common_1 = require("@nestjs/common");
class ValidationUtil {
    static validateRequired(value, fieldName) {
        if (value === undefined || value === null) {
            throw new common_1.BadRequestException(`${fieldName} is required`);
        }
        if (typeof value === 'string' && value.trim() === '') {
            throw new common_1.BadRequestException(`${fieldName} cannot be empty`);
        }
    }
    static validateString(value, fieldName, minLength = 1, maxLength = 255) {
        this.validateRequired(value, fieldName);
        if (typeof value !== 'string') {
            throw new common_1.BadRequestException(`${fieldName} must be a string`);
        }
        if (value.trim().length < minLength) {
            throw new common_1.BadRequestException(`${fieldName} must be at least ${minLength} characters long`);
        }
        if (value.trim().length > maxLength) {
            throw new common_1.BadRequestException(`${fieldName} must not exceed ${maxLength} characters`);
        }
    }
    static validateEmail(email) {
        this.validateRequired(email, 'email');
        if (typeof email !== 'string') {
            throw new common_1.BadRequestException('Email must be a string');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            throw new common_1.BadRequestException('Invalid email format');
        }
    }
    static validateUUID(id, fieldName = 'id') {
        this.validateRequired(id, fieldName);
        if (typeof id !== 'string') {
            throw new common_1.BadRequestException(`${fieldName} must be a string`);
        }
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            throw new common_1.BadRequestException(`Invalid ${fieldName} format`);
        }
    }
    static validateNumber(value, fieldName, min, max) {
        this.validateRequired(value, fieldName);
        if (typeof value !== 'number' || isNaN(value)) {
            throw new common_1.BadRequestException(`${fieldName} must be a valid number`);
        }
        if (min !== undefined && value < min) {
            throw new common_1.BadRequestException(`${fieldName} must be at least ${min}`);
        }
        if (max !== undefined && value > max) {
            throw new common_1.BadRequestException(`${fieldName} must not exceed ${max}`);
        }
    }
    static validateBoolean(value, fieldName) {
        this.validateRequired(value, fieldName);
        if (typeof value !== 'boolean') {
            throw new common_1.BadRequestException(`${fieldName} must be a boolean`);
        }
    }
    static validateDate(value, fieldName) {
        this.validateRequired(value, fieldName);
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            throw new common_1.BadRequestException(`${fieldName} must be a valid date`);
        }
    }
    static validateEnum(value, enumObject, fieldName) {
        this.validateRequired(value, fieldName);
        if (!Object.values(enumObject).includes(value)) {
            throw new common_1.BadRequestException(`${fieldName} must be one of: ${Object.values(enumObject).join(', ')}`);
        }
    }
    static validateArray(value, fieldName, minLength = 0) {
        this.validateRequired(value, fieldName);
        if (!Array.isArray(value)) {
            throw new common_1.BadRequestException(`${fieldName} must be an array`);
        }
        if (value.length < minLength) {
            throw new common_1.BadRequestException(`${fieldName} must contain at least ${minLength} items`);
        }
    }
    static validatePassword(password) {
        this.validateString(password, 'password', 8, 128);
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            throw new common_1.BadRequestException('Password must contain at least one uppercase letter, one lowercase letter, and one number');
        }
    }
    static sanitizeString(value) {
        return value?.trim() || '';
    }
    static validateObjectId(value, fieldName = 'id') {
        this.validateRequired(value, fieldName);
        if (typeof value === 'string') {
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            if (uuidRegex.test(value))
                return;
            if (/^\d+$/.test(value))
                return;
        }
        if (typeof value === 'number' && value > 0)
            return;
        throw new common_1.BadRequestException(`Invalid ${fieldName} format`);
    }
    static validatePhone(phone) {
        if (!phone)
            return;
        if (typeof phone !== 'string') {
            throw new common_1.BadRequestException('Phone must be a string');
        }
        const phoneRegex = /^[+]?[1-9]?[0-9]{7,15}$/;
        if (!phoneRegex.test(phone.replace(/[\s-()]/g, ''))) {
            throw new common_1.BadRequestException('Invalid phone number format');
        }
    }
    static validateUrl(url, fieldName) {
        if (!url)
            return;
        if (typeof url !== 'string') {
            throw new common_1.BadRequestException(`${fieldName} must be a string`);
        }
        try {
            new URL(url);
        }
        catch {
            throw new common_1.BadRequestException(`Invalid ${fieldName} format`);
        }
    }
    static validateDecimal(value, fieldName, precision = 2) {
        this.validateRequired(value, fieldName);
        if (typeof value !== 'number' || isNaN(value)) {
            throw new common_1.BadRequestException(`${fieldName} must be a valid number`);
        }
        if (value < 0) {
            throw new common_1.BadRequestException(`${fieldName} must be a positive number`);
        }
        const decimalPlaces = (value.toString().split('.')[1] || '').length;
        if (decimalPlaces > precision) {
            throw new common_1.BadRequestException(`${fieldName} can have at most ${precision} decimal places`);
        }
    }
    static createSuccessResponse(message, data) {
        return {
            success: true,
            message,
            ...(data && { data }),
        };
    }
    static createErrorResponse(message, details) {
        return {
            success: false,
            message,
            ...(details && { details }),
        };
    }
    static createPaginatedResponse(message, data, total, page, limit) {
        return {
            success: true,
            message,
            data,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
exports.ValidationUtil = ValidationUtil;
//# sourceMappingURL=validation.util.js.map
export declare class ValidationUtil {
    static validateRequired(value: any, fieldName: string): void;
    static validateString(value: any, fieldName: string, minLength?: number, maxLength?: number): void;
    static validateEmail(email: any): void;
    static validateUUID(id: any, fieldName?: string): void;
    static validateNumber(value: any, fieldName: string, min?: number, max?: number): void;
    static validateBoolean(value: any, fieldName: string): void;
    static validateDate(value: any, fieldName: string): void;
    static validateEnum(value: any, enumObject: any, fieldName: string): void;
    static validateArray(value: any, fieldName: string, minLength?: number): void;
    static validatePassword(password: any): void;
    static sanitizeString(value: string): string;
    static validateObjectId(value: any, fieldName?: string): void;
    static validatePhone(phone: any): void;
    static validateUrl(url: any, fieldName: string): void;
    static validateDecimal(value: any, fieldName: string, precision?: number): void;
    static createSuccessResponse(message: string, data?: any): {
        data: any;
        success: boolean;
        message: string;
    };
    static createErrorResponse(message: string, details?: any): {
        details: any;
        success: boolean;
        message: string;
    };
    static createPaginatedResponse(message: string, data: any[], total: number, page: number, limit: number): {
        success: boolean;
        message: string;
        data: any[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    };
}

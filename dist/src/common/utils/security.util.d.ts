export declare class SecurityUtil {
    static sanitizeString(input: string): string;
    static validateId(id: any): string;
    static validateObject(obj: any): void;
    static validateUUID(id: string): void;
    static sanitizeLogMessage(message: string): string;
    static validateEmail(email: string): boolean;
    static sanitizeInput(input: string): string;
    static sanitizeQueryParams(params: any): any;
    static validateIdArray(ids: string[]): string[];
    static validatePassword(password: string): boolean;
}

import { Logger } from '@nestjs/common';
export declare class SafeLogger extends Logger {
    static log(message: any, context?: string): void;
    static error(message: any, trace?: string, context?: string): void;
    static warn(message: any, context?: string): void;
    static debug(message: string, context?: string): void;
}

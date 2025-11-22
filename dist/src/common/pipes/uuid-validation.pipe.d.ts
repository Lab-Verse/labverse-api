import { PipeTransform } from '@nestjs/common';
export declare class UuidValidationPipe implements PipeTransform<string> {
    transform(value: string): string;
}

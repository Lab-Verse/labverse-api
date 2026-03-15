import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

function uuidValidate(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

@Injectable()
export class UuidValidationPipe implements PipeTransform<string> {
  transform(value: string): string {
    if (!uuidValidate(value)) {
      throw new BadRequestException('ID is not match or found');
    }
    return value;
  }
}

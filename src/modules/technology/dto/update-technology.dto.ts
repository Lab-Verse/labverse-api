import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { CreateTechnologyDto } from './create-technology.dto';

export class UpdateTechnologyDto extends PartialType(CreateTechnologyDto) {
  @ApiPropertyOptional({
    description: 'Updated name of the technology',
    example: 'Express.js',
    minLength: 3,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @Transform(({ value }) => {
    if (typeof value === 'string' && value.trim() === '') {
      return undefined;
    }
    return value;
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Updated description of the technology',
    example: 'A fast, unopinionated, minimalist web framework for Node.js.',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Transform(({ value }) => {
    if (typeof value === 'string' && value.trim() === '') {
      return undefined;
    }
    return value;
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Updated category of the technology',
    example: 'Web Framework',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Transform(({ value }) => {
    if (typeof value === 'string' && value.trim() === '') {
      return undefined;
    }
    return value;
  })
  category?: string;

  @ApiPropertyOptional({
    description: 'Updated logo URL for the technology',
    example: 'https://example.com/express-logo.png',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  @Transform(({ value }) => {
    if (typeof value === 'string' && value.trim() === '') {
      return undefined;
    }
    return value;
  })
  logo?: string;
}

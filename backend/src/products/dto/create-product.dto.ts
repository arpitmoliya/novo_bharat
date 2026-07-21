import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ required: false, description: 'Auto-generated from name if omitted' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ required: false, example: '134523-00-5' })
  @IsOptional()
  @IsString()
  casNumber?: string;

  @ApiProperty({ required: false, example: 'WHO-GMP' })
  @IsOptional()
  @IsString()
  gmpStatus?: string;

  @ApiProperty({ required: false, example: 'Available', description: 'e.g. Available / On Request' })
  @IsOptional()
  @IsString()
  regulatoryStatus?: string;

  @ApiProperty({ required: false, example: '25 kg HDPE Drum' })
  @IsOptional()
  @IsString()
  packing?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsInt()
  categoryId?: number | null;

  // --- SEO ---

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  metaTitle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  metaDescription?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  metaKeywords?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ogImage?: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  noindex?: boolean;
}

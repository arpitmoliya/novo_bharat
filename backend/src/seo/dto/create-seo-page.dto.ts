import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export const CHANGEFREQ_VALUES = [
  'always',
  'hourly',
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'never',
] as const;

export class CreateSeoPageDto {
  @ApiProperty({ example: '/about', description: 'Website route this config applies to' })
  @IsString()
  @Matches(/^\//, { message: 'path must start with "/"' })
  path: string;

  @ApiProperty({ required: false, example: 'About Us' })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  keywords?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  canonicalUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ogTitle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ogDescription?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ogImage?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  twitterTitle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  twitterDescription?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  twitterImage?: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  noindex?: boolean;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  nofollow?: boolean;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  includeInSitemap?: boolean;

  @ApiProperty({ required: false, default: 0.5, minimum: 0, maximum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  sitemapPriority?: number;

  @ApiProperty({ required: false, enum: CHANGEFREQ_VALUES, default: 'weekly' })
  @IsOptional()
  @IsIn(CHANGEFREQ_VALUES)
  sitemapChangefreq?: string;
}

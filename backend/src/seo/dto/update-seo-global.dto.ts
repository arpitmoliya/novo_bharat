import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateSeoGlobalDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  siteName?: string;

  @ApiProperty({ required: false, description: 'Use %s as the page-title placeholder, e.g. "%s | Novo Bharat"' })
  @IsOptional()
  @IsString()
  titleTemplate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  defaultTitle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  defaultDescription?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  defaultKeywords?: string;

  @ApiProperty({ required: false, example: 'https://novobharat.com' })
  @IsOptional()
  @IsString()
  canonicalBaseUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  defaultOgImage?: string;

  @ApiProperty({ required: false, example: '@novobharat' })
  @IsOptional()
  @IsString()
  twitterHandle?: string;

  @ApiProperty({ required: false, example: 'summary_large_image' })
  @IsOptional()
  @IsString()
  twitterCardType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  robotsDefaultIndex?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  robotsDefaultFollow?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  googleSiteVerification?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bingSiteVerification?: string;

  @ApiProperty({ required: false, example: 'G-XXXXXXXXXX' })
  @IsOptional()
  @IsString()
  googleAnalyticsId?: string;
}

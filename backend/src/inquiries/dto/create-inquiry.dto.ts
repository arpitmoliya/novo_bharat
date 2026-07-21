import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateInquiryDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  fullName: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(160)
  company: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  country: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(160)
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  phone?: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(160)
  molecule: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  quantity: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(160)
  market?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(3000)
  notes?: string;
}

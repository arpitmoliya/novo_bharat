import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateBrochureDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  title: string;

  @ApiProperty({ description: 'URL of the PDF file', example: '/catalogue/NovoBharat.pdf' })
  @IsString()
  @MinLength(1)
  fileUrl: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

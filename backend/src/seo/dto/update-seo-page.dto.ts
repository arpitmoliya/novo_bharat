import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateSeoPageDto } from './create-seo-page.dto';

// All fields optional on update, and `path` is immutable once created.
export class UpdateSeoPageDto extends PartialType(
  OmitType(CreateSeoPageDto, ['path'] as const),
) {}

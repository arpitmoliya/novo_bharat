import { PartialType } from '@nestjs/swagger';
import { CreateBrochureDto } from './create-brochure.dto';

export class UpdateBrochureDto extends PartialType(CreateBrochureDto) {}

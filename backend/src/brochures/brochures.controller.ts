import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BrochuresService } from './brochures.service';
import { CreateBrochureDto } from './dto/create-brochure.dto';
import { UpdateBrochureDto } from './dto/update-brochure.dto';

@ApiTags('brochures')
@Controller('brochures')
export class BrochuresController {
  constructor(private readonly brochuresService: BrochuresService) {}

  @Get()
  findAll() {
    return this.brochuresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.brochuresService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateBrochureDto) {
    return this.brochuresService.create(dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBrochureDto) {
    return this.brochuresService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.brochuresService.remove(id);
  }
}

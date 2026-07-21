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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSeoPageDto } from './dto/create-seo-page.dto';
import { UpdateSeoGlobalDto } from './dto/update-seo-global.dto';
import { UpdateSeoPageDto } from './dto/update-seo-page.dto';
import { SeoService } from './seo.service';

@ApiTags('seo')
@Controller('seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  // --- Public reads (consumed by the website) ---

  @Get('resolve')
  resolve(@Query('path') path: string) {
    return this.seoService.resolve(path ?? '/');
  }

  @Get('sitemap')
  sitemap() {
    return this.seoService.sitemap();
  }

  @Get('robots')
  robots() {
    return this.seoService.robots();
  }

  @Get('global')
  getGlobal() {
    return this.seoService.getGlobal();
  }

  // --- Admin: global defaults ---

  @Patch('global')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  updateGlobal(@Body() dto: UpdateSeoGlobalDto) {
    return this.seoService.updateGlobal(dto);
  }

  // --- Admin: per-page CRUD ---

  @Get('pages')
  findAllPages() {
    return this.seoService.findAllPages();
  }

  @Get('pages/:id')
  findOnePage(@Param('id', ParseIntPipe) id: number) {
    return this.seoService.findOnePage(id);
  }

  @Post('pages')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  createPage(@Body() dto: CreateSeoPageDto) {
    return this.seoService.createPage(dto);
  }

  @Patch('pages/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  updatePage(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSeoPageDto,
  ) {
    return this.seoService.updatePage(id, dto);
  }

  @Delete('pages/:id')
  @HttpCode(204)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async removePage(@Param('id', ParseIntPipe) id: number) {
    await this.seoService.removePage(id);
  }
}

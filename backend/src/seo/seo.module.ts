import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/category.entity';
import { Product } from '../products/product.entity';
import { SeoController } from './seo.controller';
import { SeoGlobal } from './seo-global.entity';
import { SeoPage } from './seo-page.entity';
import { SeoService } from './seo.service';

@Module({
  imports: [TypeOrmModule.forFeature([SeoGlobal, SeoPage, Product, Category])],
  controllers: [SeoController],
  providers: [SeoService],
  exports: [SeoService],
})
export class SeoModule {}

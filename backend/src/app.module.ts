import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BrochuresModule } from './brochures/brochures.module';
import { CategoriesModule } from './categories/categories.module';
import { buildDataSourceOptions } from './database/data-source';
import { InquiriesModule } from './inquiries/inquiries.module';
import { ProductsModule } from './products/products.module';
import { SeoModule } from './seo/seo.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(buildDataSourceOptions()),
    UsersModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    BrochuresModule,
    SeoModule,
    InquiriesModule,
  ],
})
export class AppModule {}

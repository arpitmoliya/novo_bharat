import { DataSourceOptions } from 'typeorm';
import { Brochure } from '../brochures/brochure.entity';
import { Category } from '../categories/category.entity';
import { Inquiry } from '../inquiries/inquiry.entity';
import { Product } from '../products/product.entity';
import { SeoGlobal } from '../seo/seo-global.entity';
import { SeoPage } from '../seo/seo-page.entity';
import { User } from '../users/user.entity';

export function buildDataSourceOptions(): DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME ?? 'novobharat',
    password: process.env.DB_PASSWORD ?? 'novobharat',
    database: process.env.DB_DATABASE ?? 'novobharat_admin',
    entities: [User, Category, Product, Brochure, SeoGlobal, SeoPage, Inquiry],
    // Dev convenience: auto-creates/updates tables from entities.
    // Replace with migrations before production.
    synchronize: true,
    // Render's managed Postgres requires SSL for external connections only.
    // Internal (same-region) connections don't, so SSL is opt-in via DB_SSL=true.
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  };
}

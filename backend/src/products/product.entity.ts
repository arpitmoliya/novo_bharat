import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ name: 'cas_number', type: 'varchar', length: 255, nullable: true })
  casNumber: string | null;

  @Column({ name: 'gmp_status', type: 'varchar', length: 255, nullable: true })
  gmpStatus: string | null;

  @Column({ name: 'regulatory_status', type: 'varchar', length: 255, nullable: true })
  regulatoryStatus: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  packing: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'image_url', type: 'varchar', length: 1024, nullable: true })
  imageUrl: string | null;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category | null;

  @Column({ name: 'category_id', type: 'int', nullable: true })
  categoryId: number | null;

  // --- SEO (per-product overrides for future /products/:slug detail pages) ---

  @Column({ name: 'meta_title', type: 'varchar', length: 255, nullable: true })
  metaTitle: string | null;

  @Column({ name: 'meta_description', type: 'text', nullable: true })
  metaDescription: string | null;

  @Column({ name: 'meta_keywords', type: 'text', nullable: true })
  metaKeywords: string | null;

  @Column({ name: 'og_image', type: 'varchar', length: 1024, nullable: true })
  ogImage: string | null;

  @Column({ default: false })
  noindex: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

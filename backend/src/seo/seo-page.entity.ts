import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Per-route SEO overrides, keyed by the website path (e.g. "/", "/about",
 * "/products"). Any null field falls back to the SeoGlobal default at resolve
 * time. Seeded with the site's known static routes.
 */
@Entity('seo_pages')
export class SeoPage {
  @PrimaryGeneratedColumn()
  id: number;

  // The web route this config applies to. Normalized: leading slash, no trailing slash.
  @Column({ unique: true })
  path: string;

  // Friendly name shown in the admin list (e.g. "Home", "About Us").
  @Column({ type: 'varchar', length: 255, nullable: true })
  label: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'text', nullable: true })
  keywords: string | null;

  @Column({ name: 'canonical_url', type: 'varchar', length: 512, nullable: true })
  canonicalUrl: string | null;

  @Column({ name: 'og_title', type: 'varchar', length: 255, nullable: true })
  ogTitle: string | null;

  @Column({ name: 'og_description', type: 'text', nullable: true })
  ogDescription: string | null;

  @Column({ name: 'og_image', type: 'varchar', length: 1024, nullable: true })
  ogImage: string | null;

  @Column({ name: 'twitter_title', type: 'varchar', length: 255, nullable: true })
  twitterTitle: string | null;

  @Column({ name: 'twitter_description', type: 'text', nullable: true })
  twitterDescription: string | null;

  @Column({ name: 'twitter_image', type: 'varchar', length: 1024, nullable: true })
  twitterImage: string | null;

  @Column({ default: false })
  noindex: boolean;

  @Column({ default: false })
  nofollow: boolean;

  @Column({ name: 'include_in_sitemap', default: true })
  includeInSitemap: boolean;

  @Column({ name: 'sitemap_priority', type: 'float', default: 0.5 })
  sitemapPriority: number;

  @Column({ name: 'sitemap_changefreq', type: 'varchar', length: 32, default: 'weekly' })
  sitemapChangefreq: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

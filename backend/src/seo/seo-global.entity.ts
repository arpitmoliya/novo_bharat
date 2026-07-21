import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/**
 * Site-wide SEO defaults. Singleton row (id = 1) — the service auto-creates it
 * on first access. Holds fallbacks used whenever a page/product has no override,
 * plus global-only concerns (verification codes, analytics).
 */
@Entity('seo_global')
export class SeoGlobal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'site_name', type: 'varchar', length: 255, default: 'Novo Bharat' })
  siteName: string;

  // Applied to page-specific titles, e.g. "%s | Novo Bharat". Use %s as the placeholder.
  @Column({ name: 'title_template', type: 'varchar', length: 255, default: '%s | Novo Bharat' })
  titleTemplate: string;

  @Column({ name: 'default_title', type: 'varchar', length: 255, default: 'Novo Bharat' })
  defaultTitle: string;

  @Column({ name: 'default_description', type: 'text', nullable: true })
  defaultDescription: string | null;

  @Column({ name: 'default_keywords', type: 'text', nullable: true })
  defaultKeywords: string | null;

  // Absolute origin (e.g. https://novobharat.com) used to build canonical/OG/sitemap URLs.
  @Column({ name: 'canonical_base_url', type: 'varchar', length: 512, nullable: true })
  canonicalBaseUrl: string | null;

  @Column({ name: 'default_og_image', type: 'varchar', length: 1024, nullable: true })
  defaultOgImage: string | null;

  @Column({ name: 'twitter_handle', type: 'varchar', length: 255, nullable: true })
  twitterHandle: string | null;

  @Column({ name: 'twitter_card_type', type: 'varchar', length: 64, default: 'summary_large_image' })
  twitterCardType: string;

  @Column({ name: 'robots_default_index', default: true })
  robotsDefaultIndex: boolean;

  @Column({ name: 'robots_default_follow', default: true })
  robotsDefaultFollow: boolean;

  @Column({ name: 'google_site_verification', type: 'varchar', length: 255, nullable: true })
  googleSiteVerification: string | null;

  @Column({ name: 'bing_site_verification', type: 'varchar', length: 255, nullable: true })
  bingSiteVerification: string | null;

  @Column({ name: 'google_analytics_id', type: 'varchar', length: 64, nullable: true })
  googleAnalyticsId: string | null;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

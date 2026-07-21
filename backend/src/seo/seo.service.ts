import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Product } from '../products/product.entity';
import { CreateSeoPageDto } from './dto/create-seo-page.dto';
import { UpdateSeoGlobalDto } from './dto/update-seo-global.dto';
import { UpdateSeoPageDto } from './dto/update-seo-page.dto';
import { SeoGlobal } from './seo-global.entity';
import { SeoPage } from './seo-page.entity';

/** Shape returned to the website for a single route — everything pre-merged. */
export interface ResolvedSeo {
  path: string;
  title: string;
  description: string | null;
  keywords: string | null;
  canonicalUrl: string | null;
  siteName: string;
  ogTitle: string;
  ogDescription: string | null;
  ogImage: string | null;
  ogType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string | null;
  twitterImage: string | null;
  twitterHandle: string | null;
  index: boolean;
  follow: boolean;
  googleSiteVerification: string | null;
  bingSiteVerification: string | null;
  googleAnalyticsId: string | null;
}

export interface SitemapEntry {
  loc: string;
  changefreq: string;
  priority: number;
  lastmod: string | null;
}

@Injectable()
export class SeoService {
  constructor(
    @InjectRepository(SeoGlobal)
    private readonly globalRepo: Repository<SeoGlobal>,
    @InjectRepository(SeoPage)
    private readonly pageRepo: Repository<SeoPage>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  // --- Global singleton ---------------------------------------------------

  async getGlobal(): Promise<SeoGlobal> {
    const existing = await this.globalRepo.findOne({ where: { id: 1 } });
    if (existing) return existing;
    // Auto-provision the singleton with entity defaults on first access.
    return this.globalRepo.save(this.globalRepo.create({ id: 1 }));
  }

  async updateGlobal(dto: UpdateSeoGlobalDto): Promise<SeoGlobal> {
    const global = await this.getGlobal();
    // Only overwrite keys the caller actually sent.
    const target = global as unknown as Record<string, unknown>;
    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined) target[key] = value;
    }
    return this.globalRepo.save(global);
  }

  // --- Page CRUD ----------------------------------------------------------

  findAllPages(): Promise<SeoPage[]> {
    return this.pageRepo.find({ order: { path: 'ASC' } });
  }

  async findOnePage(id: number): Promise<SeoPage> {
    const page = await this.pageRepo.findOne({ where: { id } });
    if (!page) throw new NotFoundException('SEO page not found');
    return page;
  }

  async createPage(dto: CreateSeoPageDto): Promise<SeoPage> {
    const path = this.normalizePath(dto.path);
    await this.assertPathFree(path);
    const page = this.pageRepo.create({ ...dto, path });
    return this.pageRepo.save(page);
  }

  async updatePage(id: number, dto: UpdateSeoPageDto): Promise<SeoPage> {
    const page = await this.findOnePage(id);
    const target = page as unknown as Record<string, unknown>;
    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined) target[key] = value;
    }
    return this.pageRepo.save(page);
  }

  async removePage(id: number): Promise<void> {
    const result = await this.pageRepo.delete(id);
    if (!result.affected) throw new NotFoundException('SEO page not found');
  }

  // --- Public resolve -----------------------------------------------------

  /** Merge global defaults with the page override for `path` (if any). */
  async resolve(rawPath: string): Promise<ResolvedSeo> {
    const global = await this.getGlobal();
    const path = this.normalizePath(rawPath || '/');
    const page = await this.pageRepo.findOne({ where: { path } });

    const title = page?.title?.trim()
      ? this.applyTemplate(global.titleTemplate, page.title.trim())
      : global.defaultTitle;
    const description = page?.description ?? global.defaultDescription;
    const ogImage = this.absolutize(global, page?.ogImage ?? global.defaultOgImage);

    return {
      path,
      title,
      description,
      keywords: page?.keywords ?? global.defaultKeywords,
      canonicalUrl: this.absolutize(global, page?.canonicalUrl ?? path),
      siteName: global.siteName,
      ogTitle: page?.ogTitle ?? title,
      ogDescription: page?.ogDescription ?? description,
      ogImage,
      ogType: 'website',
      twitterCard: global.twitterCardType,
      twitterTitle: page?.twitterTitle ?? page?.ogTitle ?? title,
      twitterDescription: page?.twitterDescription ?? page?.ogDescription ?? description,
      twitterImage:
        this.absolutize(global, page?.twitterImage ?? page?.ogImage ?? null) ?? ogImage,
      twitterHandle: global.twitterHandle,
      index: page ? !page.noindex : global.robotsDefaultIndex,
      follow: page ? !page.nofollow : global.robotsDefaultFollow,
      googleSiteVerification: global.googleSiteVerification,
      bingSiteVerification: global.bingSiteVerification,
      googleAnalyticsId: global.googleAnalyticsId,
    };
  }

  // --- Sitemap / robots ---------------------------------------------------

  async sitemap(): Promise<{ baseUrl: string | null; entries: SitemapEntry[] }> {
    const global = await this.getGlobal();
    const base = this.normalizeBase(global.canonicalBaseUrl);
    const entries: SitemapEntry[] = [];

    // 1. Static/CMS-managed routes.
    const pages = await this.pageRepo.find({
      where: { includeInSitemap: true },
      order: { path: 'ASC' },
    });
    for (const p of pages) {
      if (p.noindex) continue;
      entries.push({
        loc: this.join(base, p.path),
        changefreq: p.sitemapChangefreq,
        priority: p.sitemapPriority,
        lastmod: p.updatedAt ? p.updatedAt.toISOString() : null,
      });
    }

    // 2. Dynamic product & category detail routes (forward-looking — these
    //    resolve once the web exposes /products/:slug and /categories/:slug).
    const products = await this.productRepo.find({
      where: { isActive: true },
      order: { updatedAt: 'DESC' },
    });
    for (const p of products) {
      if (p.noindex) continue;
      entries.push({
        loc: this.join(base, `/products/${p.slug}`),
        changefreq: 'weekly',
        priority: 0.6,
        lastmod: p.updatedAt ? p.updatedAt.toISOString() : null,
      });
    }

    const categories = await this.categoryRepo.find({ order: { name: 'ASC' } });
    for (const c of categories) {
      if (c.noindex) continue;
      entries.push({
        loc: this.join(base, `/categories/${c.slug}`),
        changefreq: 'weekly',
        priority: 0.5,
        lastmod: c.updatedAt ? c.updatedAt.toISOString() : null,
      });
    }

    return { baseUrl: base, entries };
  }

  async robots(): Promise<{
    baseUrl: string | null;
    sitemapUrl: string | null;
    index: boolean;
    disallow: string[];
  }> {
    const global = await this.getGlobal();
    const base = this.normalizeBase(global.canonicalBaseUrl);
    const noindexPages = await this.pageRepo.find({ where: { noindex: true } });
    return {
      baseUrl: base,
      sitemapUrl: base ? this.join(base, '/sitemap.xml') : null,
      index: global.robotsDefaultIndex,
      disallow: noindexPages.map((p) => p.path),
    };
  }

  // --- Helpers ------------------------------------------------------------

  private async assertPathFree(path: string, exceptId?: number): Promise<void> {
    const where = exceptId ? { path, id: Not(exceptId) } : { path };
    const existing = await this.pageRepo.findOne({ where });
    if (existing) throw new ConflictException(`SEO config for "${path}" already exists`);
  }

  private normalizePath(p: string): string {
    let s = (p ?? '').trim();
    if (!s.startsWith('/')) s = `/${s}`;
    if (s.length > 1 && s.endsWith('/')) s = s.slice(0, -1);
    return s;
  }

  private normalizeBase(base: string | null): string | null {
    if (!base) return null;
    return base.trim().replace(/\/+$/, '');
  }

  private join(base: string | null, path: string): string {
    if (!base) return path;
    return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
  }

  private applyTemplate(template: string | null, title: string): string {
    if (template && template.includes('%s')) return template.replace('%s', title);
    return title;
  }

  /** Turn a relative path into an absolute URL when a base URL is configured. */
  private absolutize(global: SeoGlobal, value: string | null): string | null {
    if (!value) return null;
    if (/^https?:\/\//i.test(value)) return value;
    const base = this.normalizeBase(global.canonicalBaseUrl);
    return base ? this.join(base, value) : value;
  }
}

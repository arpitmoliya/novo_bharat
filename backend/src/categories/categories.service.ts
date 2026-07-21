import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { slugify } from '../common/slugify';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.repo.find({ order: { createdAt: 'DESC', id: 'DESC' } });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.repo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const slug = dto.slug?.trim() ? slugify(dto.slug) : slugify(dto.name);
    await this.assertSlugFree(slug);
    const category = this.repo.create({
      name: dto.name,
      slug,
      description: dto.description ?? null,
      metaTitle: dto.metaTitle ?? null,
      metaDescription: dto.metaDescription ?? null,
      metaKeywords: dto.metaKeywords ?? null,
      ogImage: dto.ogImage ?? null,
      noindex: dto.noindex ?? false,
    });
    return this.repo.save(category);
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    if (dto.name !== undefined) category.name = dto.name;
    if (dto.description !== undefined) category.description = dto.description ?? null;
    if (dto.slug !== undefined && dto.slug.trim()) {
      const slug = slugify(dto.slug);
      await this.assertSlugFree(slug, id);
      category.slug = slug;
    }
    if (dto.metaTitle !== undefined) category.metaTitle = dto.metaTitle ?? null;
    if (dto.metaDescription !== undefined)
      category.metaDescription = dto.metaDescription ?? null;
    if (dto.metaKeywords !== undefined) category.metaKeywords = dto.metaKeywords ?? null;
    if (dto.ogImage !== undefined) category.ogImage = dto.ogImage ?? null;
    if (dto.noindex !== undefined) category.noindex = dto.noindex;
    return this.repo.save(category);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (!result.affected) throw new NotFoundException('Category not found');
  }

  private async assertSlugFree(slug: string, exceptId?: number): Promise<void> {
    const where = exceptId ? { slug, id: Not(exceptId) } : { slug };
    const existing = await this.repo.findOne({ where });
    if (existing) throw new ConflictException(`Slug "${slug}" already exists`);
  }
}

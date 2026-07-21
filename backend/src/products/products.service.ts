import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Not, Repository } from 'typeorm';
import { Category } from '../categories/category.entity';
import { slugify } from '../common/slugify';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async findAll(query: QueryProductDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const qb = this.repo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .orderBy('product.createdAt', 'DESC')
      .addOrderBy('product.id', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (query.categoryId) {
      qb.andWhere('product.category_id = :categoryId', {
        categoryId: query.categoryId,
      });
    }

    if (query.search) {
      const term = `%${query.search.toLowerCase()}%`;
      qb.andWhere(
        new Brackets((w) => {
          w.where('LOWER(product.name) LIKE :term', { term })
            .orWhere('LOWER(product.cas_number) LIKE :term', { term })
            .orWhere('LOWER(product.gmp_status) LIKE :term', { term })
            .orWhere('LOWER(product.packing) LIKE :term', { term });
        }),
      );
    }

    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const slug = dto.slug?.trim() ? slugify(dto.slug) : slugify(dto.name);
    await this.assertSlugFree(slug);
    await this.assertCategoryExists(dto.categoryId);

    const product = this.repo.create({
      name: dto.name,
      slug,
      casNumber: dto.casNumber ?? null,
      gmpStatus: dto.gmpStatus ?? null,
      regulatoryStatus: dto.regulatoryStatus ?? null,
      packing: dto.packing ?? null,
      description: dto.description ?? null,
      imageUrl: dto.imageUrl ?? null,
      isActive: dto.isActive ?? true,
      categoryId: dto.categoryId ?? null,
      metaTitle: dto.metaTitle ?? null,
      metaDescription: dto.metaDescription ?? null,
      metaKeywords: dto.metaKeywords ?? null,
      ogImage: dto.ogImage ?? null,
      noindex: dto.noindex ?? false,
    });
    return this.repo.save(product);
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    if (dto.slug !== undefined && dto.slug.trim()) {
      const slug = slugify(dto.slug);
      await this.assertSlugFree(slug, id);
      product.slug = slug;
    }
    if (dto.name !== undefined) product.name = dto.name;
    if (dto.casNumber !== undefined) product.casNumber = dto.casNumber ?? null;
    if (dto.gmpStatus !== undefined) product.gmpStatus = dto.gmpStatus ?? null;
    if (dto.regulatoryStatus !== undefined)
      product.regulatoryStatus = dto.regulatoryStatus ?? null;
    if (dto.packing !== undefined) product.packing = dto.packing ?? null;
    if (dto.description !== undefined) product.description = dto.description ?? null;
    if (dto.imageUrl !== undefined) product.imageUrl = dto.imageUrl ?? null;
    if (dto.isActive !== undefined) product.isActive = dto.isActive;
    if (dto.categoryId !== undefined) {
      await this.assertCategoryExists(dto.categoryId);
      product.categoryId = dto.categoryId ?? null;
    }
    if (dto.metaTitle !== undefined) product.metaTitle = dto.metaTitle ?? null;
    if (dto.metaDescription !== undefined)
      product.metaDescription = dto.metaDescription ?? null;
    if (dto.metaKeywords !== undefined) product.metaKeywords = dto.metaKeywords ?? null;
    if (dto.ogImage !== undefined) product.ogImage = dto.ogImage ?? null;
    if (dto.noindex !== undefined) product.noindex = dto.noindex;

    return this.repo.save(product);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (!result.affected) throw new NotFoundException('Product not found');
  }

  private async assertSlugFree(slug: string, exceptId?: number): Promise<void> {
    const where = exceptId ? { slug, id: Not(exceptId) } : { slug };
    const existing = await this.repo.findOne({ where });
    if (existing) throw new ConflictException(`Slug "${slug}" already exists`);
  }

  private async assertCategoryExists(categoryId?: number | null): Promise<void> {
    if (categoryId === undefined || categoryId === null) return;
    const category = await this.categoryRepo.findOne({ where: { id: categoryId } });
    if (!category) throw new BadRequestException(`Category ${categoryId} does not exist`);
  }
}

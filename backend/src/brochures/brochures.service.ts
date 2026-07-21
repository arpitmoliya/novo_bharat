import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brochure } from './brochure.entity';
import { CreateBrochureDto } from './dto/create-brochure.dto';
import { UpdateBrochureDto } from './dto/update-brochure.dto';

@Injectable()
export class BrochuresService {
  constructor(
    @InjectRepository(Brochure)
    private readonly repo: Repository<Brochure>,
  ) {}

  findAll(): Promise<Brochure[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Brochure> {
    const brochure = await this.repo.findOne({ where: { id } });
    if (!brochure) throw new NotFoundException('Brochure not found');
    return brochure;
  }

  create(dto: CreateBrochureDto): Promise<Brochure> {
    const brochure = this.repo.create({
      title: dto.title,
      fileUrl: dto.fileUrl,
      description: dto.description ?? null,
      isActive: dto.isActive ?? true,
    });
    return this.repo.save(brochure);
  }

  async update(id: number, dto: UpdateBrochureDto): Promise<Brochure> {
    const brochure = await this.findOne(id);
    if (dto.title !== undefined) brochure.title = dto.title;
    if (dto.fileUrl !== undefined) brochure.fileUrl = dto.fileUrl;
    if (dto.description !== undefined) brochure.description = dto.description ?? null;
    if (dto.isActive !== undefined) brochure.isActive = dto.isActive;
    return this.repo.save(brochure);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (!result.affected) throw new NotFoundException('Brochure not found');
  }
}

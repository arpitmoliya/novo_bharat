import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { Inquiry } from './inquiry.entity';

@Injectable()
export class InquiriesService {
  constructor(
    @InjectRepository(Inquiry)
    private readonly repo: Repository<Inquiry>,
    private readonly mail: MailService,
  ) {}

  async create(dto: CreateInquiryDto): Promise<Inquiry> {
    // Persist first so the enquiry is never lost, even if email delivery fails.
    const inquiry = this.repo.create({
      fullName: dto.fullName,
      company: dto.company,
      country: dto.country,
      email: dto.email,
      phone: dto.phone ?? null,
      molecule: dto.molecule,
      quantity: dto.quantity,
      market: dto.market ?? null,
      notes: dto.notes ?? null,
    });
    const saved = await this.repo.save(inquiry);

    const emailSent = await this.mail.sendInquiryNotification(saved);
    if (emailSent) {
      saved.emailSent = true;
      await this.repo.save(saved);
    }

    return saved;
  }

  findAll(): Promise<Inquiry[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
}

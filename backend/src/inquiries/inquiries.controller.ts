import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { InquiriesService } from './inquiries.service';

@ApiTags('inquiries')
@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  /** Public — submitted by the website Contact form. */
  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateInquiryDto) {
    await this.inquiriesService.create(dto);
    return { ok: true };
  }

  /** Admin — list received enquiries. */
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.inquiriesService.findAll();
  }
}

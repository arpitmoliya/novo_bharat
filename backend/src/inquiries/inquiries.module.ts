import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../mail/mail.module';
import { InquiriesController } from './inquiries.controller';
import { InquiriesService } from './inquiries.service';
import { Inquiry } from './inquiry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inquiry]), MailModule],
  controllers: [InquiriesController],
  providers: [InquiriesService],
})
export class InquiriesModule {}

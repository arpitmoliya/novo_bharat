import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brochure } from './brochure.entity';
import { BrochuresController } from './brochures.controller';
import { BrochuresService } from './brochures.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brochure])],
  controllers: [BrochuresController],
  providers: [BrochuresService],
  exports: [BrochuresService],
})
export class BrochuresModule {}

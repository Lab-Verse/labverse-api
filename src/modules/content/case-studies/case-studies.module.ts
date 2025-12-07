import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseStudiesService } from './case-studies.service';
import { CaseStudiesController } from './case-studies.controller';
import { CaseStudy } from './entities/case-study.entity';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([CaseStudy]), SharedModule],
  controllers: [CaseStudiesController],
  providers: [CaseStudiesService],
  exports: [CaseStudiesService],
})
export class CaseStudiesModule {}

import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { BrandFactoryService } from './factory/brand.factory';

@Module({
  controllers: [BrandController],
  providers: [BrandService, BrandFactoryService],
})
export class BrandModule {}

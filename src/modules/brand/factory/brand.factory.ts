import { BrandRepository } from '@models/index';
import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandFactoryService {
  constructor(private readonly brandRepository: BrandRepository) {}
  createBrand(createBrandDto: CreateBrandDto, user: any) {
    const brand = new Brand();
    brand.name = createBrandDto.name;
    brand.slug = slugify(createBrandDto.name);
    brand.createdBy = user._id;
    brand.updatedBy = user._id;
    return brand;
  }
}

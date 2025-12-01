import { Injectable } from '@nestjs/common';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { BrandRepository } from './../../models/brand/brand.repository';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}
  create(brand: Brand) {}

  findAll() {
    return `This action returns all brand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}

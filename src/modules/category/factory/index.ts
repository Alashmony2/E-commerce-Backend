import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/category.entity';
import slugify from 'slugify';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryRepository } from '@models/index';

@Injectable()
export class CategoryFactoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  createCategory(createCategoryDto: CreateCategoryDto, user: any) {
    const category = new Category();
    category.name = createCategoryDto.name;
    category.slug = slugify(createCategoryDto.name, {
      replacement: '-',
      lower: true,
      trim: true,
    });
    category.createdBy = user._id;
    category.updatedBy = user._id;
    return category;
  }
  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto, user: any) {
    const oldCategory = await this.categoryRepository.getOne({ _id: id });
    if (!oldCategory) throw new NotFoundException('Category Not Found');
    const category = new Category();
    const newName = updateCategoryDto.name || oldCategory.name;
    category.name = newName;
    category.slug = slugify(newName, {
      replacement: '-',
      lower: true,
      trim: true,
    });
    category.updatedBy = user._id;
    return category;
  }
}

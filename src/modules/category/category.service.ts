import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoryRepository } from '@models/index';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async create(category: Category) {
    const categoryExist = await this.categoryRepository.getOne({
      slug: category.slug,
    });
    if (categoryExist) throw new ConflictException('Category already exist');
    return await this.categoryRepository.create(category);
  }

  findAll() {
    return `This action returns all category`;
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.getOne({ _id: id }, {}, {populate: [{path: 'createdBy'}, {path: 'updatedBy'}]});
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: string, category: Category) {
    const categoryExist = await this.categoryRepository.getOne({
      slug: category.slug,
      _id: { $ne: id },
    });
    if (categoryExist) throw new ConflictException('Category already exist');
    return await this.categoryRepository.update({ _id: id }, category, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

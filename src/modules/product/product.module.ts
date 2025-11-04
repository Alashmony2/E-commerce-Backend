import { Module } from '@nestjs/common';
import {
  AdminRepository,
  CustomerRepository,
  SellerRepository
} from 'src/models';
import { UserMongoModule } from 'src/shared';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports:[
    UserMongoModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

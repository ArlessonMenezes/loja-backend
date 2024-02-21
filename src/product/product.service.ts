import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './model/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
       private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(createProduct: CreateProductDto) {
    const productExist = await this.productRepository.findOneBy({
      name: createProduct.name,
    });

    if (productExist) {
      throw new BadRequestException('product is already register in database.');
    };
    
    const product = this.productRepository.create(createProduct);
    const savedProduct = await this.productRepository.save(product);

    return savedProduct;
  };

  async getProducts() {
    return this.productRepository.find();
  };
}

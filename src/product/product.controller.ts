import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CategoryProductEnum } from './enums/category-product.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a product' })
  @Post()
  async createProduct(
    @Body() productDto: CreateProductDto,
  ) {
    return this.productService.createProduct(productDto);
  }

  @ApiOperation({ summary: 'Get products' })
  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }
}

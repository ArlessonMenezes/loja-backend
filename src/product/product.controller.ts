import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
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

  @ApiOperation({ summary: 'Get a product' })
  @ApiParam({ name: 'idProduct' })
  @Get('/:idProduct')
  async getProductById(@Param('idProduct') idProduct: string) {
    return this.productService.getProductById(idProduct);
  }
}

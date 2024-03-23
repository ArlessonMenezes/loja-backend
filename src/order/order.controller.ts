import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserTypeEnum } from 'src/user/enum/user-type.enum';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { CreateorderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) {}

    @Roles(UserTypeEnum.Admin)
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a order' })
    @ApiQuery({ name: 'idUser' })
    @Post()
    async createProduct(
      @Query('idUser') idUser: string,
      @Body() datasOrder: CreateorderDto,
    ) {
      return this.orderService.createOrder(idUser, datasOrder);
    };
}

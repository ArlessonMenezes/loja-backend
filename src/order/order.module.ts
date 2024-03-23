import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './model/order.entity';
import { Product } from 'src/product/model/product.entity';
import { User } from 'src/user/model/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Product,
      User,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}

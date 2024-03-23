import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Order } from './model/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/model/product.entity';
import { User } from 'src/user/model/user.entity';
import { CreateorderDto } from './dto/create-order.dto';
import { ItemOrder } from './model/item-order.entity';
import { OrderStatusEnum } from './enums/order-status.enum';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {} 

  //função para validar entrada dos dados do pedido
  async validatingOrderData(
    dataOrders: CreateorderDto,
    productRelationship: Product[],
  ) {

    //varre a lista de itens do pedido e verifica se o produto do pedido é o mesmo do produto relacionado
    dataOrders.itemsOrder.forEach(itemOrder => {
      const productRelation = productRelationship.find(
        product => product.idProduct === itemOrder.idProduct
      );

      //verifica se existe algum produto 
      if (productRelation === undefined) {
        throw new NotFoundException(`
          The product with id ${itemOrder.idProduct} not found.
        `);
      };

      //verifica se a quantidade do produto no pedido é maior do que a quantidade de produtos em estoque
      if (itemOrder.quantity > productRelation.quantity) {
        throw new BadRequestException(`
          The quantity (${itemOrder.quantity}) 
          is greater than that available (${productRelation.quantity}) 
          for the related product ${productRelation.name}.
        `);
      };
    });
  }

  async createOrder(idUser: string, datasOrder: CreateorderDto) {
    const user = await this.findUserById(idUser);

    const idsProducts = datasOrder.itemsOrder.map(dataOrder => dataOrder.idProduct);

    const relatedProducts = await this.productRepository.findBy({
      idProduct: In(idsProducts),
    });

    await this.validatingOrderData(datasOrder, relatedProducts);

    const listOrders = datasOrder.itemsOrder.map(itemOrder => {
      const itemOrderEntity = new ItemOrder();

      const relatedProduct = relatedProducts.find(
        product => product.idProduct === itemOrder.idProduct,
      );

      itemOrderEntity.Product = relatedProduct;
      itemOrderEntity.salePrice = relatedProduct.price;
      itemOrderEntity.quantity = itemOrder.quantity;
      itemOrderEntity.Product.quantity -= itemOrder.quantity;

      return itemOrderEntity;
    });

    const amount = listOrders.reduce((val, item) => {
      return val - item.salePrice * item.quantity;
    }, 0);

    const order = this.orderRepository.create({
      status: OrderStatusEnum.Processing,
      itemsOrder: listOrders,
      amount,
      user,
    });

    await this.orderRepository.save(order);
  };

  async updateOrder(idOrder: string, statusOrder: UpdateOrderDto) {
    const order = await this.orderRepository.findOneBy({ idOrder });

    if (!order) {
      throw new NotFoundException('order not found.');
    };

    Object.assign(order.idOrder, statusOrder);

    await this.orderRepository.save(order);
  };

  private async findUserById(idUser: string) {
    const user = await this.userRepository.findOne({
      where: { idUser },
      select: ['idUser', 'name', 'email']
    });

    if (!user) {
      throw new NotFoundException('user not found.');
    };

    return user;
  }
}

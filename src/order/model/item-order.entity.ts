import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "src/product/model/product.entity";

@Entity()
export class ItemOrder {
  @PrimaryGeneratedColumn('uuid')
  idItemOrder: string;

  @Column()
  quantity: number;

  @Column()
  salePrice: number;

  @ManyToOne(() => Order, order => order.itemsOrder, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: Order;

  @ManyToOne(() => Product, Product => Product.itemsProducts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  Product: Product;
}
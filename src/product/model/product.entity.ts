import { ItemOrder } from "src/order/model/item-order.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  idProduct: string;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  description: string

  @Column({ nullable: true })
  category: string;

  @Column()
  urlImage: string;

  @OneToMany(() => ItemOrder, ItemProduct => ItemProduct.Product)
  itemsProducts: ItemOrder[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
import { User } from "src/user/model/user.entity";
import { Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ItemOrder } from "./item-order.entity";

export class Order {
  @PrimaryGeneratedColumn('uuid')
  idOrder: string;

  @Column({ nullable: false })
  amount: number;

  @Column({ nullable: false, default: 'processing' })
  status: string;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @OneToMany(() => ItemOrder, ItemProduct => ItemProduct.order)
  itemsOrder: ItemOrder[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
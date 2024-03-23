import { OrderStatusEnum } from "../enums/order-status.enum";

export class UpdateOrderDto {
  status: OrderStatusEnum;
}
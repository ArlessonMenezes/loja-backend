import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsUUID, ValidateNested } from "class-validator";

class ItemOrderDto {
  @IsUUID()
  idProduct: string;

  @IsInt()
  quantity: number;
}

export class CreateorderDto {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemOrderDto)
  itemsOrder: ItemOrderDto[];
}
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { CategoryProductEnum } from "../enums/category-product.enum";

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsOptional()
  urlImage?: string;

  @IsNotEmpty()
  @ApiProperty({ enum: CategoryProductEnum, example: [
    CategoryProductEnum.Console,
    CategoryProductEnum.Jogo,
    CategoryProductEnum.Acessorio,
  ]})
  category: CategoryProductEnum; 
}
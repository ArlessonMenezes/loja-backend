import { ApiProperty } from "@nestjs/swagger";
import { AddressDto } from "./address.dto";

export class UpdateUserDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  address?: AddressDto;
};
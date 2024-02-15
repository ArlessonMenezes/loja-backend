import { ApiProperty } from "@nestjs/swagger";

export class AddressDto {
  @ApiProperty()
  road: string;
  
  @ApiProperty()
  zipCode: string;
  
  @ApiProperty()
  district: string;

  @ApiProperty()
  state: string;
};
import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from './address.dto';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  confirmedPassword: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  address: AddressDto;
};
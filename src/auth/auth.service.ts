import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { compare, compareSync } from 'bcrypt';
import { StatusEnum } from 'src/user/enum/status.enum';
import { LoginPayloadDto } from './dto/login-payload.dto';
import { User } from 'src/user/model/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}    

  async login(loginDto: LoginDto) {
    const user = await this.userService.verifyUserExists(loginDto.email);

    const returnUser: Partial<User> = {
      idUser: user.idUser,
      name: user.name,
      email: user.email,
      typeUser: user.typeUser,
    };

    return {
      token: this.jwtService.sign({...new LoginPayloadDto(user)}),
      user: returnUser,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.verifyUserExists(email);

    if (!user) return null;

    const confirmedPassword = await compare(password, user.password);

    if (!confirmedPassword) return null;

    if (user.status === StatusEnum.INACTIVE) return null;

    return user;
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { StatusEnum } from './enum/status.enum';
import { compare, hash } from 'bcrypt';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdatePassword } from './dtos/update-password.dto';
import { UserTypeEnum } from './enum/user-type.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async createUser(data: CreateUserDto, isAdmin?: boolean) {
    const user = await this.verifyUserExists(data.email);

    if (user) throw new BadRequestException('user already exists.');
    
    if (data.password !== data.confirmedPassword) {
      throw new BadRequestException("password don't match");
    };  

    const salt = 10;
    const hashedPassword = await hash(data.password, salt);

    const newUser = this.userRepository.create({
      name: data.name,
      email: data.email,
      status: StatusEnum.ACITVE,
      password: hashedPassword,
      address: JSON.stringify(data.address),
      phone: data.phone,
      typeUser: isAdmin === true ? UserTypeEnum.Admin : UserTypeEnum.User,  
    });

    await this.userRepository.save(newUser);

    const { password, createdAt, updatedAt, address, ...createdUser } = newUser;

    return {
      createdUser,
      address: JSON.parse(address),
    };
  }

  async verifyUserExists(email: string) {
    return this.userRepository.findOneBy({ email });
  };

  async findUserById(idUser: string) {
    const user =  this.userRepository.findOneBy({ idUser });

    if (!user) throw new NotFoundException('user not found.');

    return user;
  };

  async getUsers() {
    const users = await this.userRepository.find();

    const listUserrs: Partial<User>[] = users.map(user => ({
      idUSer: user.idUser,
      name: user.name,
      email: user.email,
      status: user.status,
      typeUser: user.typeUser,
      addres: JSON.parse(user.address),
    }));

    return listUserrs;
  };

  async updateUser(idUser: string, updateDto: UpdateUserDto) {
    const user = await this.findUserById(idUser);

    const userUpdate = await this.userRepository.update(user.idUser, {
      ...updateDto,
      address: JSON.stringify(updateDto.address),
    });

    return userUpdate;
  };

  async updatePassword(idUser: string, data: UpdatePassword) {
    const user = await this.findUserById(idUser);

    const matchPassword = await compare(data.oldPassword, user.password);

    if (!matchPassword) throw new BadRequestException("passwords don't match.");

    if (data.newPassword !== data.comfirmedNewPassword) {
      throw new BadRequestException('new password is invalid.');
    };

    const salt = 10;
    const hashedPassword = await hash(data.newPassword, salt);
    
    user.password = hashedPassword;
    await this.userRepository.save(user);    
  }

  async getUser(idUser: string) {
    const user = await this.verifyUserExists(idUser);

    if (!user) throw new NotFoundException('user not found.');

    const viewUser: Partial<User> = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      typeUser: user.typeUser,
      address: JSON.parse(user.address),
    };

    return viewUser;
  }

  async bannedUser(idUser: string) {
    const user = await this.findUserById(idUser);
  
    if (user.status === StatusEnum.INACTIVE) {
      throw new BadRequestException('user is already inactive.');
    };

    await this.userRepository.update(user.idUser, {
      status: StatusEnum.INACTIVE,
    });

    return { message: `user ${user.name} was banned with success` };
  }
}

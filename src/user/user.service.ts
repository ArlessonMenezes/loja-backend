import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { StatusEnum } from './enum/status.enum';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async createUser(data: CreateUserDto) {
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
    });

    await this.userRepository.save(newUser);

    const { password, createdAt, updatedAt, ...createdUser } = newUser;

    return createdUser;
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
    const users = await this.userRepository.find({
      select: [
        'idUser',
        'name',
        'email',
        'status',
        'address',
      ],
    });

    const listUserrs = users.map(user => ({
      idUSer: user.idUser,
      name: user.name,
      email: user.email,
      status: user.status,
      addres: JSON.parse(user.address),
    }));

    return listUserrs;
  };
}

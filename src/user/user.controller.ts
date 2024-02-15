import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ){}

  @ApiOperation({ summary: 'create user' })
  @Post()
  async createuser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  };

  @ApiTags('User')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List users' })
  @ApiBearerAuth()
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  };
}

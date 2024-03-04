import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdatePassword } from './dtos/update-password.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserTypeEnum } from './enum/user-type.enum';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ){}

  @ApiOperation({ summary: 'create user' })
  @ApiQuery({ name: 'isAdmin', required: false })
  @Post()
  async createuser(
    @Body() data: CreateUserDto,
    @Query('isAdmin') isAdmin?: boolean,  
  ) {
    return this.userService.createUser(data, isAdmin);
  };


  @UseGuards(JwtAuthGuard)
  @Roles(UserTypeEnum.Admin)
  @ApiOperation({ summary: 'List users' })
  @ApiBearerAuth()
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  };

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'idUser' })
  @ApiBearerAuth()
  @Put('/update-user/:idUser')
  async updateUser(
    @Param('idUser') idUser: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    return this.userService.updateUser(idUser, updateUser);
  };

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update password' })
  @ApiParam({ name: 'idUser' })
  @ApiBearerAuth()
  @Patch('/update-password/:idUser')
  async updatePassword(
    @Param('idUser') idUser: string,
    @Body() updatePassword: UpdatePassword,
  ) {
    return this.userService.updatePassword(idUser, updatePassword);
  };
}

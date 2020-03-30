import { Controller, Get, NotFoundException, Param, Post, Headers, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUserDto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/current')
  async getCurrentUser(@Headers() headers: any) {
    const userId = parseInt(headers['userId']);

    const user = await this.usersService.getById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Get('/:id')
  async getUser(@Param('id') id) {
    const user = await this.usersService.getById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Post()
  async createUser(@Headers() headers: any, @Body() createUserDto: CreateUserDto) {
    const userId = parseInt(headers['userId']);

    await this.usersService.create(createUserDto);
    return this.usersService.getById(userId);
  }
}

import { Controller, Get, Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): { id: number; name: string }[] {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() user: { name: string }): { id: number; name: string } {
    return this.usersService.create(user);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UsersService } from '../services/users.service'
import { UserDto } from '../dto/user.dto'
import { User } from '../entities/user.entity'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  // {
  //   "username": "abc",
  //   "password": "abc"
  // }
  @Post()
  create(@Body() userDto: UserDto): Promise<UserDto>{
    return this.usersService.create(userDto)
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.usersService.findAll()
  }

}

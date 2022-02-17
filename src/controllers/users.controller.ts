import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UsersService } from '../services/users.service'
import { UserDto } from '../dto/user.dto'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post()
  create(@Body() userDto: UserDto) : Promise<UserDto>{
    return this.usersService.create(userDto)
  }

  @Get()
  async findAll() : Promise<UserDto[]> {
    return this.usersService.findAll()
  }

  // TODO
  @Get(':id')
  findOne(@Param('id') id: string) : Promise<UserDto> {
    return this.usersService.findOne(new UserDto)
  }

  // TODO
  @Patch(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto) : Promise<UserDto> {
    return this.usersService.update(+id, userDto)
  }

  // TODO
  @Delete(':id')
  remove(@Param('id') id: string) : Promise<UserDto> {
    return this.usersService.remove(+id)
  }
}

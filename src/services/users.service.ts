import { Injectable } from '@nestjs/common'
import { UserDto } from '../dto/user.dto'
import { User } from '../entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from "typeorm"
import { validate } from "class-validator"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  async create(userDto: UserDto): Promise<UserDto>{
    /*const errors = await validate(userDto)
    if (errors.length > 0)
      return new Promise<UserDto>(null)
    else*/
    return this.userRepository.save(userDto)
  }

  findAll(): Promise<UserDto[]> {
    return this.userRepository.find()
  }

  // TODO
  findOne(id: number): Promise<UserDto> {
    return new Promise<UserDto>(null)
  }

  // TODO
  update(id: number, userDto: UserDto): Promise<UserDto> {
    return new Promise<UserDto>(null)
  }

  // TODO
  remove(id: number): Promise<UserDto> {
    return new Promise<UserDto>(null)
  }
}

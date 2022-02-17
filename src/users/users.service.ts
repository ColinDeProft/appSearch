import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  create(userDto: UserDto) : Promise<UserDto>{
    return this.userRepository.save(userDto)
  }

  findAll() : Promise<UserDto[]> {
    return this.userRepository.find()
  }

  // TODO
  findOne(id: number) : Promise<UserDto> {
    return new Promise<UserDto>(null);
  }

  // TODO
  update(id: number, userDto: UserDto) : Promise<UserDto> {
    return new Promise<UserDto>(null);
  }

  // TODO
  remove(id: number) : Promise<UserDto> {
    return new Promise<UserDto>(null);
  }
}

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

  findAll(): Promise<UserDto[]> {
    return this.userRepository.find()
  }

  private users: User[] = [];

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, userDto: UserDto): User {
    const i = this.users.findIndex((user) => user.id == id);
    if (i === -1) return null;
    this.users[i] = {
      ...this.users[i],
      ...userDto,
    };
    return this.users[i];
  }

  remove(id: number): User {
    const i = this.users.findIndex((user) => user.id == id);
    if (i === -1) return null;
    const user = this.users[i];
    this.users.splice(i, 1);
    return user;
  }
}

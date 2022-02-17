import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idSeq = 0;

  create(userDto: UserDto) {
    this.users.push({
      ...userDto,
      id: this.idSeq++,
    });
    return this.users.at(-1);
  }

  findAll(): User[] {
    return this.users;
  }

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

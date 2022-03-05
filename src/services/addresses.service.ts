import { Injectable } from '@nestjs/common'
import { UserDto } from '../dto/user.dto'
import { User } from '../entities/user.entity'
import { Address } from '../entities/address.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from "typeorm"
import { validate } from "class-validator"
import { UsersService } from './users.service';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private usersService: UsersService
  ){}

  // todo address dto

  create(user: UserDto, address: string): Promise<Address>{
    const newAddress = this.addressRepository.create({ user: user, addr: address })
    return this.addressRepository.save(newAddress)
  }

  findOne(user: UserDto, address: string): Promise<Address> {
    return this.addressRepository.findOne({
      relations: ['user'],
      where: {
        user:  user,
        addr: address
      }
    })
  }

  findAllByUserId(userId: number): Promise<Address[]> {
    let user = this.usersService.findById(userId)
    return this.addressRepository.find({
      relations: ['user'],
      where: {
        user:  user
      }
    })
  }

}

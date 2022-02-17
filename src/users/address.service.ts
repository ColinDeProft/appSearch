import { Injectable } from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { User } from './entities/user.entity'
import { Address } from './entities/address.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from "typeorm"
import { validate } from "class-validator"

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>
  ){}

  create(user: User, address: string): Promise<Address>{
    const newAddress = this.addressRepository.create({ user: user, addr: address })
    return this.addressRepository.save(newAddress)
  }

  findOneOrFail(user: User, address: string): Promise<Address> {
    return this.addressRepository.findOneOrFail({ where: { user: user, addr: address } })
  }
}

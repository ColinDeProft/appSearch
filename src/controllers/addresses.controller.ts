import { Controller, Get, Post, Param, Body } from '@nestjs/common'
import { AddressDto } from '../dto/address.dto'
import { AddressesService } from '../services/addresses.service'

@Controller('addresses')
export class AddressesController {
  constructor(
    private readonly addressesService: AddressesService
  ) {}

  @Get(':id')
  findAllByUserId(@Param('id') userId: number) : Promise<AddressDto[]> {
    return this.addressesService.findAllByUserId(userId)
  }

}

import { Module } from '@nestjs/common'
import { SubscriptionsService } from '../services/subscriptions.service'
import { UsersService } from '../services/users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SubscriptionsController } from '../controllers/subscriptions.controller'
import { User } from '../entities/user.entity'
import { AddressesService } from 'src/services/addresses.service'
import { Address } from 'src/entities/address.entity'
import { AddressesController } from 'src/controllers/addresses.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, 
      Address
    ])
  ],
  controllers: [AddressesController],
  providers: [
    UsersService,
    AddressesService
  ]
})
export class AddressesModule {}

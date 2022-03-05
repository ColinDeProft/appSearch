import { Module } from '@nestjs/common'
import { SubscriptionsService } from '../services/subscriptions.service'
import { UsersService } from '../services/users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SubscriptionsController } from '../controllers/subscriptions.controller'
import { User } from '../entities/user.entity'
import { AddressesService } from 'src/services/addresses.service'
import { Address } from 'src/entities/address.entity'
import { Subscription } from 'src/entities/subscription.entity'
import { CriteriaService } from 'src/services/criteria.service'
import { Criterion } from 'src/entities/criterion.entity'
import { CriterionName } from 'src/entities/criterionName.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, 
      Address,
      Subscription,
      CriterionName,
      Criterion
    ])
  ],
  controllers: [SubscriptionsController],
  providers: [
    SubscriptionsService,
    UsersService,
    AddressesService,
    CriteriaService
  ]
})
export class SubscriptionsModule {}

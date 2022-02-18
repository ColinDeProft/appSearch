import { Module } from '@nestjs/common'
import { SubscriptionsService } from '../services/subscriptions.service'
import { UsersService } from '../services/users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SubscriptionsController } from '../controllers/subscriptions.controller'
import { User } from '../entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [SubscriptionsController],
  providers: [
    SubscriptionsService,
    UsersService
  ]
})
export class SubscriptionsModule {}

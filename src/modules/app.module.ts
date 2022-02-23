import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users.module'
import { SubscriptionsModule } from './subscriptions.module'
import { AddressesModule } from './addresses.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    SubscriptionsModule,
    AddressesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

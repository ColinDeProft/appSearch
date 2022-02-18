import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users.module'
import { SubscriptionsModule } from './subscriptions.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    SubscriptionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

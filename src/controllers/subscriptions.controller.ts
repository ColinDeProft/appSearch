import { Controller, Post, Body } from '@nestjs/common'
import { SubscriptionDto } from '../dto/subscription.dto'
import { SubscriptionsService } from '../services/subscriptions.service'

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService
  ) {}

  // {
  //   "criteriaList": {
  //       "MINPRICE": 200,
  //       "MAXPRICE": 800,
  //       "HASGARAGE": null,
  //       "MINSURFACE": 40
  //   },
  //   "user": {
  //       "username": "abc",
  //       "password": "abc"
  //   }
  // }
  @Post()
  async addSub(@Body() subscriptionDto: SubscriptionDto) {
    return this.subscriptionsService.addSub(subscriptionDto)
  }

}

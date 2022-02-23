import { Controller, Post, Body } from '@nestjs/common'
import { SubscriptionDto } from '../dto/subscription.dto'
import { SubscriptionsService } from '../services/subscriptions.service'

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService
  ) {}

  // sample of a subsrciptionDto :
  // {
  //   criteriaList: {
  //     "MAX_PRICE": "750",
  //     "TRANSACTION_TYPE": "RENT",
  //     "PROPERTY_TYPE": "APPARTMENT",
  //     "POSTAL_CODE": "1200",
  //     "MIN_ENERGY_CLASS": "D",
  //     "HAS_GARAGE": null,  // will be ignored
  //     "MIN_SURFACE": 40    // will be in unavailable because not usable
  //   },
  //   user: {
  //     "username": "abc",
  //     "password": "abc"
  //   }
  // }
  @Post()
  async addSub(@Body() subscriptionDto: SubscriptionDto) {
    return this.subscriptionsService.addSub(subscriptionDto)
  }

}

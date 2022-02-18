import { Controller, Post, Body } from '@nestjs/common'
import { SubscriptionDto } from '../dto/subscription.dto'
import { SubscriptionsService } from '../services/subscriptions.service'

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService
  ) {}

  @Post()
  async subscribe(@Body() subscriptionDto: SubscriptionDto) {
    return this.subscriptionsService.subscribe(subscriptionDto)
  }

}

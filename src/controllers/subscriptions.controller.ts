import { Controller, Post, Body, Get } from '@nestjs/common'
import { SubscriptionDto } from '../dto/subscription.dto'
import { SubscriptionsService } from '../services/subscriptions.service'

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService
  ) {}

  // OUTDATED
  // sample of a subsrciptionDto :
  // {
  //   criteriaList: {
  //     "MAX_PRICE": "750",
  //     "TRANSACTION_TYPE": "RENT",
  //     "PROPERTY_TYPE": "APPARTMENT",
  //     "POSTAL_CODE": "1200",
  //     "MIN_ENERGY_CLASS": "D",
  //     "HAS_GARAGE": null,  // will be ignored in immowebcontroller
  //     "MIN_SURFACE": 40    // will be in unavailables of immowebcontroller because not usable
  //   },
  //   user: {
  //     "username": "abc",
  //     "password": "abc"
  //   }
  // }
  @Post()
  async create(@Body() subscriptionDto: SubscriptionDto): Promise<SubscriptionDto> {
    console.log("post sub")
    const createdSubscription = await this.subscriptionsService.create(subscriptionDto)
    return createdSubscription
  }

  @Get()
  async findAll(): Promise<SubscriptionDto[]> {
    const allSub = await this.subscriptionsService.findAll()
    return allSub
  }

  @Get(':id')
  async findOne(subId: number): Promise<SubscriptionDto> {
    const existingSub = await this.subscriptionsService.findOne(subId)
    return existingSub
  }

  @Post('/setActive')
  async setActive(@Body() subscriptionDto: SubscriptionDto): Promise<boolean> {
    const result = await this.subscriptionsService.setActive(subscriptionDto)
    return result
  }

}

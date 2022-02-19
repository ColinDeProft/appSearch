import { SubscriptionDto } from '../dto/subscription.dto';
import { UsersService } from './users.service';
import { Injectable } from '@nestjs/common'
import { Subscription } from '../inspectors/subscription'
import { User } from 'src/entities/user.entity';
import { AddressesService } from './addresses.service';

@Injectable()
export class SubscriptionsService {

  subscriptions: {[username: string]: Subscription} = {}

  constructor(
    private usersService: UsersService,
    // private addressesService: AddressesService
  ){}

  async addSub(subscriptionDto: SubscriptionDto): Promise<string> {

    let user = await this.usersService.findOne(subscriptionDto.user)
    if(!user)
      return "No such user"

    // this.subscriptions[user.username] = new Subscription(user, this.addressesService, subscriptionDto.criteriaList)
    this.subscriptions[user.username] = new Subscription(user, subscriptionDto.criteriaList)
    let newSub = this.subscriptions[user.username]
    newSub.spam()

    return "Updated subscription for " + user.username
  }
}

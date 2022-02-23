import { SubscriptionDto } from '../dto/subscription.dto';
import { UsersService } from './users.service';
import { Injectable } from '@nestjs/common'
import { Subscription } from '../inspectors/subscription'
import { User } from 'src/entities/user.entity';
import { AddressesService } from './addresses.service';
import { allCriteriaNames } from 'src/common/constants';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class SubscriptionsService {

  subscriptions: {[username: string]: Subscription} = {}

  constructor(
    private usersService: UsersService,
    private addressesService: AddressesService
  ){}

  async addSub(subscriptionDto: SubscriptionDto): Promise<string> {
    let fetchedUser = await this.usersService.findByUsernameAndPassword(subscriptionDto.user)
    if(!fetchedUser)
      return "No such user"
    this.subscriptions[fetchedUser.username] = new Subscription(fetchedUser, subscriptionDto.criteriaList, this.addressesService)
    let newSub = this.subscriptions[fetchedUser.username]
    newSub.spam()
    return "Updated subscription for " + fetchedUser.username
  }
}

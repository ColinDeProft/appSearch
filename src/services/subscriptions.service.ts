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
    // private addressesService: AddressesService
  ){
    this.addSubFake(
      {
        "MAX_PRICE": "750",
        "TRANSACTION_TYPE": "RENT",
        "PROPERTY_TYPE": "APPARTMENT",
        "POSTAL_CODE": "1200",
        "MIN_ENERGY_CLASS": "D",
        "HAS_GARAGE": null,  // will be ignored
        "MIN_SURFACE": 40    // will be in unavailable because not usable
      },
      {
        "username": "abc",
        "password": "abc"
      }
    )
  }

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

  async addSubFake(criteriaList: {[criterionName: string]: any}, user: UserDto): Promise<string> {
    this.subscriptions[user.username] = new Subscription(user, criteriaList)
    let newSub = this.subscriptions[user.username]
    newSub.spam()
    return "Updated subscription for " + user.username
  }
}

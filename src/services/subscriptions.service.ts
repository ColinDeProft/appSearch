import { SubscriptionDto } from '../dto/subscription.dto';
import { UsersService } from './users.service';
import { Injectable } from '@nestjs/common'
import { AddressesService } from './addresses.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dispatcher } from 'src/inspectors/dispatcher';
import { Subscription } from 'src/entities/subscription.entity';
import { CriteriaService } from './criteria.service';
import { Criterion } from 'src/entities/criterion.entity';
import { CriterionName } from 'src/entities/criterionName.entity';

@Injectable()
export class SubscriptionsService {

  dispatchers: {[subId: number]: Dispatcher} = {}

  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Criterion)
    private criterionRepository: Repository<Criterion>,
    @InjectRepository(CriterionName)
    private criterionNameRepository: Repository<CriterionName>,

    private usersService: UsersService,
    private addressesService: AddressesService,
    private criteriaService: CriteriaService
  ){
    this.resumeDispatchers()
  }

  async resumeDispatchers(): Promise<void> {
    const activeSubscriptions = await this.subscriptionRepository.find({
      is_active: true
    })
    for(const sub of activeSubscriptions) {
      this.runDispatcher(sub);
    }
  }

  async create(subscriptionDto: SubscriptionDto): Promise<SubscriptionDto> {
    let existingUser = await this.usersService.findByUsernameAndPassword(subscriptionDto.user)
    if(!existingUser)
      return null
    const createdSub = await this.subscriptionRepository.save({
      interval: 20000, // subscriptionDto.interval //!\ todo make restrictions
      user: existingUser,
      is_active: false
    })
    let newCriteriaList: Criterion[] = []
    for(const criterion of subscriptionDto.criteriaList) {
      const existingCriterionName = await this.criteriaService.findOneByName(criterion.criterionName.name)
      if(existingCriterionName) {
        let createdCriterion = await this.criterionRepository.save({
          criterionName: existingCriterionName,
          value: criterion.value,
          subscription: createdSub
        })
        newCriteriaList.push(createdCriterion)
      }
    }
    // await this.subscriptionRepository.save({
    //   id: createdSub.id,
    //   criteriaList: newCriteriaList
    // })
    return createdSub
  }

  async setActive(subscriptionDto: SubscriptionDto): Promise<boolean> {
    if(subscriptionDto.id == null || subscriptionDto.is_active == null)
      return false
    const exisitingSub = await this.subscriptionRepository.findOne({
      id: subscriptionDto.id
    })
    if(!exisitingSub)
      return false
    await this.subscriptionRepository.save({
      id: exisitingSub.id,
      is_active: subscriptionDto.is_active
    })
    subscriptionDto.is_active ? this.runDispatcher(exisitingSub) : this.killDispatcher(exisitingSub)
    return true
  }

  runDispatcher(subscriptionDto: SubscriptionDto): void {
    const newDispatcher = new Dispatcher(subscriptionDto, this.addressesService)
    newDispatcher.run();
    this.dispatchers[subscriptionDto.id] = newDispatcher
  }

  killDispatcher(subscriptionDto: SubscriptionDto): void {
    const dispatcher = this.dispatchers[subscriptionDto.id]
    dispatcher.kill()
    this.dispatchers[subscriptionDto.id] = null
  }

  // todo getFirstOverview()

  async findAll(): Promise<SubscriptionDto[]> {
    const allSubscriptions = await this.subscriptionRepository.find()
    return allSubscriptions
  }

  async findOne(subId: number): Promise<SubscriptionDto> {
    const exisitingSub = await this.subscriptionRepository.findOne({id: subId})
    return exisitingSub
  }
}

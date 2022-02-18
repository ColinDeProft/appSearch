import { SubscriptionDto } from '../dto/subscription.dto';
import { UsersService } from './users.service';
import { Injectable } from '@nestjs/common'
import { UserDto } from '../dto/user.dto'

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly usersService: UsersService
  ){}

  async subscribe(subscription: SubscriptionDto): Promise<string> {
    let usr = await this.usersService.findOne(subscription.user)
    if(!usr)
      return "No such user"
    // subscriptions.get(usr.username).stop()
    // subscriptions.get(usr.username).setInspectorsRequests(subscription.criteriaList)
    // subscriptions.get(usr.username).setInspectorsMissingCriteria(subscription.criteriaList)
    // subscriptions.get(usr.username).spam()
    // return "Existing user : criteria list is now the one you gave"
    // 
    // class subscription
    // setInspectorsRequests(criteriaList: string[]) {
    //  foreach inspector in userInspectors { inspector.setRequest(criteriaList)) }
    // }
    // setInspectorsMissingCriteria(criteriaList: string[]) {
    //  foreach inspector in userInspectors { inspector.setMissingCriteria(criteriaList)) }
    // }
    // spam() {
    //  setTimeout({
    //    inspectorsResults = []
    //    foreach inspector in userInspectors { inspectorsResults.push(inspector.inspect()) }
    //    foreach addr in foreach inspector.addresses in inspectorsResults { 
    //      if(addressRepo.find(addr))
    //        inspector.addresses.remove(addr)
    //      else
    //        addressRepo.create(user: this.user, addr: addr)
    //    sendToNotifAPI(inspectorsResults, this.user.token)
    //    }
    //  }, 10000)
    // }
    // 
    // class inspectImmovlan extends inspector
    // setRequest(criteriaList: string[]) {
    //  this.request = { method: this.method, payload: buildUrl(this.baseUrl, criteriaList) }
    // }
    // setMissingCriteria(criteriaList: string[]) {
    //  this.missingCriteria = tools.getMissingCriteria(this.allCriteria, criteriaList)
    // }
    // inspect() {
    //  response = tools.sendRequest(this.request)
    //  addresses = immovlanScraper.extractAddresses(response)
    //  return { addresses, this.missingCriteria }
    // }
    // 
    // class inspectImmoweb extends inspector
    // setRequest(criteriaList: string[]) {
    //  this.request = { method: this.method, payload: buildJson(criteriaList) }
    // }
    // ...
    // 
    // class tools
    // sendRequest(request: {}) {
    //  if(request.method == get) {
    //    return httpClient.doGetRequest(request.payload)
    //  } else {
    //    return httpClient.doPostRequest(request.payload)
    //  }
    // }
    // 
    return "Existing user : criteria list is now the one you gave"
  }
}

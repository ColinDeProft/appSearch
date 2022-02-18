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
    //  foreach inspector in this.inspectors { inspector.setRequest(criteriaList)) }
    // }
    // setInspectorsMissingCriteria(criteriaList: string[]) {
    //  foreach inspector in this.inspectors { inspector.setMissingCriteria(criteriaList)) }
    // }
    // spam() {
    //  setTimeout({
    //    inspectorsResults = []
    //    foreach inspector in this.inspectors { 
    //      inspectorResult = await inspector.inspect()
    //      foreach addr inspectorResult.addresses { 
    //        if(addressRepo.find(addr))
    //          inspectorResult.addresses.remove(addr)
    //        else
    //          addressRepo.create(user: this.user, addr: addr)
    //      }
    //      inspectorsResults.push(inspectorResult)
    //    }
    //    sendToNotifAPI(inspectorsResults, this.user.token)
    //  }, 10000)
    // }
    // 
    // class inspectImmovlan extends inspector
    // setRequest(criteriaList: string[]) {
    //  this.request = { this.reqType, this.reqMethod, this.reqBaseUrl, criteriaList }
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
    // class tools
    // sendRequest(request: { type: string, method: string, baseUrl: string, payload: string[] }) {
    //  if(request.type == urlRequest) {
    //    return httpClient.doUrlRequest(request.method, buildUrl(request.baseUrl, request.payload))
    //  } else {
    //    return httpClient.doPayloadRequest(request.method, request.baseUrl, buildJson(request.payload))
    //  }
    // }
    // 
    return "Existing user : criteria list is now the one you gave"
  }
}

import { UserDto } from "./user.dto"
import { allCriteriaNames } from "../common/constants"

export class SubscriptionDto {
  
  criteriaList: {[criterionName: string]: string}

  user: UserDto
}
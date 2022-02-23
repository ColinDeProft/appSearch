import { UserDto } from "./user.dto"
import { allCriteriaNames } from "../common/constants"

export class SubscriptionDto {
  
  criteriaList: {[criterionName in keyof typeof allCriteriaNames]: any}

  user: UserDto
}
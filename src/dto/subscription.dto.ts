import { UserDto } from "./user.dto"
import { allCriteria } from "../common/constants"

export class SubscriptionDto {
  
  criteriaList: {[criterion in keyof typeof allCriteria]: any}

  user: UserDto
}
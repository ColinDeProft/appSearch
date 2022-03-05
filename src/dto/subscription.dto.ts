import { UserDto } from "./user.dto"
import { CriterionDto } from "./criterion.dto"
import { isBoolean } from "class-validator"

export class SubscriptionDto {
  
  id: number

  interval: number
  
  criteriaList: CriterionDto[]

  user: UserDto

  is_active: boolean
}
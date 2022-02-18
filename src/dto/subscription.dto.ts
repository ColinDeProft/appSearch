import { IsArray } from "class-validator"
import { UserDto } from "./user.dto"

export class SubscriptionDto {
  @IsArray()
  criteriaList: any = {}

  user: UserDto
}
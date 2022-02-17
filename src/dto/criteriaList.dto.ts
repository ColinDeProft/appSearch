import { IsArray } from "class-validator"
import { UserDto } from "./user.dto"

export class CriteriaList {
  @IsArray()
  list: any = {}

  user: UserDto
}
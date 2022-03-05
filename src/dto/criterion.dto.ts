import { IsString } from "class-validator"
import { CriterionNameDto } from "./criterionName.dto"

export class CriterionDto {

  criterionName: CriterionNameDto

  @IsString()
  value: string
  
}
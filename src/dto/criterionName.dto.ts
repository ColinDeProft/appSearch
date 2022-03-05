import { IsString } from "class-validator"

export class CriterionNameDto {

  id: number
  
  @IsString()
  name: string
  
}
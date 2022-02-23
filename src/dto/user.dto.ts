import { IsString } from "class-validator"

export class UserDto {

  id: number

  @IsString()
  username: string
  
  @IsString()
  password: string
}
import { CriteriaList } from '../dto/criteriaList.dto';
import { UsersService } from './users.service';
import { Injectable } from '@nestjs/common'
import { UserDto } from '../dto/user.dto'

@Injectable()
export class SearchService {
  constructor(
    private readonly usersService: UsersService
  ){}

  async search(criteriaList: CriteriaList): Promise<string> {
    let usr = await this.usersService.findOne(criteriaList.user)
    if(usr) {
      // appeler routine search sans await
      return "Existing user : criteria list is now the one you gave"
    } else
      return "No such user"
  }
}

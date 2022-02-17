import { Module } from '@nestjs/common'
import { SearchService } from '../services/search.service'
import { UsersService } from '../services/users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CriteriaListsController } from '../controllers/criteriaLists.controller'
import { User } from '../entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [CriteriaListsController],
  providers: [
    SearchService,
    UsersService
  ]
})
export class CriteriaListsModule {}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CriteriaController } from 'src/controllers/criteria.controller'
import { CriteriaService } from 'src/services/criteria.service'
import { CriterionName } from 'src/entities/criterionName.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CriterionName
    ])
  ],
  controllers: [CriteriaController],
  providers: [
    CriteriaService
  ]
})
export class CriteriaModule {}

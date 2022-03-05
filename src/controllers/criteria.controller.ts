import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CriterionNameDto } from 'src/dto/criterionName.dto'
import { CriteriaService } from 'src/services/criteria.service'
import { allCriteriaNames } from 'src/common/constants'

@Controller('criteria')
export class CriteriaController {
  
  constructor(private readonly criteriaService: CriteriaService) {}

  @Post("/names")
  async createName(): Promise<CriterionNameDto[]> {
    let criterionNames: CriterionNameDto[] = []
    for(const name of Object.values(allCriteriaNames)) {
      let createdCriterionName = await this.criteriaService.createCriterionName(name)
      criterionNames.push(createdCriterionName)
    }
    return criterionNames
  }

  @Get("/names")
  async findAll(): Promise<CriterionNameDto[]> {
    return this.criteriaService.findAll()
  }

  @Patch("/names")
  async updateName(@Body() criterionNameDto: CriterionNameDto): Promise<CriterionNameDto[]> {
    const updatedCriteriaNames = await this.criteriaService.update(criterionNameDto)
    return updatedCriteriaNames
  }

  //!\ no delete for names (it would cascade delete all the associated criteria in the user's subscriptions)

}

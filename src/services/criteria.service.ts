import { Injectable } from '@nestjs/common'
import { UserDto } from '../dto/user.dto'
import { User } from '../entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from "typeorm"
import { CriterionName } from 'src/entities/criterionName.entity'
import { CriterionNameDto } from 'src/dto/criterionName.dto'

@Injectable()
export class CriteriaService {
  constructor(
    @InjectRepository(CriterionName)
    private criterionNameRepository: Repository<CriterionName>
  ){}

  async createCriterionName(criterionName: string): Promise<CriterionNameDto> {
    const existingCriterionName = await this.criterionNameRepository.findOne({
      where: {
        name: criterionName
      }
    })
    if(existingCriterionName) 
      return null
    const createdCriterionName = this.criterionNameRepository.save({
        name: criterionName
    })
    return createdCriterionName
  }

  findAll(): Promise<CriterionNameDto[]> {
    return this.criterionNameRepository.find()
  }

  async findOneByName(name: string): Promise<CriterionNameDto> {
    const criterionName = await this.criterionNameRepository.findOne({
      where: {
        name: name
      }
    })
    return criterionName
  }

  async update(criterionNameDto: CriterionNameDto): Promise<CriterionNameDto[]> {
    let updatedCriteriaNames = []
    const criterion = await this.criterionNameRepository.findOne({
      where: {
        id: criterionNameDto.id
      }
    })
    if(criterion) {
      const updatedCriterion = await this.criterionNameRepository.save({
        id: criterion.id,
        name: criterionNameDto.name
      })
      updatedCriteriaNames.push(updatedCriterion)
    }
    return updatedCriteriaNames
  }

}

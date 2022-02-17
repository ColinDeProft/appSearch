import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CriteriaList } from '../dto/criteriaList.dto'
import { SearchService } from '../services/search.service'

@Controller('criteriaLists')
export class CriteriaListsController {
  constructor(
    private readonly searchService: SearchService
  ) {}

  @Post()
  create(@Body() criteriaList: CriteriaList) {
    return this.searchService.search(criteriaList)
  }

}

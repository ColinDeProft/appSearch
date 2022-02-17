import { Injectable } from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { User } from './entities/user.entity'
import { Address } from './entities/address.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from "typeorm"
import { validate } from "class-validator"
import { CriteriaList } from './dto/criteriaList.dto';

export class SearchService {
  constructor(
    
  ){}

  search(criteriaList: CriteriaList) {
    
  }
}

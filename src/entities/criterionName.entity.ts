import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Criterion } from "./criterion.entity"

@Entity()
export class CriterionName {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @OneToMany(type => Criterion, criterion => criterion.criterionName) 
  criteriaList: Criterion[]
}
  
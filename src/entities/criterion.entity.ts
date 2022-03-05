import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { CriterionName } from "./criterionName.entity"
import { Subscription } from "./subscription.entity"

@Entity()
export class Criterion {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  value: string

  @ManyToOne(type => CriterionName, criterionName => criterionName.criteriaList, { 
    nullable: false, 
    onDelete: 'CASCADE',
    eager: true
  }) 
  criterionName: CriterionName

  @ManyToOne(type => Subscription, subscription => subscription.criteriaList, { 
    nullable: false, 
    onDelete: 'CASCADE' 
  }) 
  subscription: Subscription
}
  
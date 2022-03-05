import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Criterion } from "./criterion.entity"
import { User } from "./user.entity"

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  interval: number

  @OneToMany(type => Criterion, criterion => criterion.subscription, { 
    eager: true 
  }) 
  criteriaList: Criterion[]

  @ManyToOne(type => User, user => user.subscriptions, { 
    nullable: false, 
    onDelete: 'CASCADE' ,
    eager: true
  }) 
  user: User

  @Column({ nullable: false })
  is_active: boolean
}
  
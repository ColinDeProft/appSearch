import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  addr: string

  @ManyToOne(type => User, user => user.addresses, { 
    nullable: false, 
    onDelete: 'CASCADE' 
  }) 
  user: User
}
  
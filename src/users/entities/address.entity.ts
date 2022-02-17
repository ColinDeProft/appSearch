import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number
    
  @ManyToOne(type => User, user => user.addresses, { nullable: false, eager: true }) 
  user: User

  @Column({ nullable: false })
  addr: string
}
  
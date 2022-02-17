import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Address } from "./address.entity"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number
    
  @Column({ nullable: false })
  username: string

  @Column({ nullable: false })
  password: string

  @OneToMany(type => Address, address => address.user) 
  addresses: Address[]
}
  
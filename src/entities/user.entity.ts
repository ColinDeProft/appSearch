import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Address } from "./address.entity"
import { Subscription } from "./subscription.entity"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number
    
  @Column({ nullable: false })
  username: string

  @Column({ nullable: false })
  password: string

  @OneToMany(type => Address, address => address.user, { 
    eager: true 
  }) 
  addresses: Address[]

  @OneToMany(type => Subscription, subscription => subscription.user) // { eager: true } if needed
  subscriptions: Subscription[]
}
  
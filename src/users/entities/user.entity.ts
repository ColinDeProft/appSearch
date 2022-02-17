import {Column,Entity,PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ nullable: false })
    username: string;

    @Column({ name: 'email', nullable: true })
    email: string;

    @Column({ name: 'password', nullable: false })
    password: string;
  }
  
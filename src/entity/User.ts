import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"varchar", nullable: true})
  firstName: string;

  @Column({type:"varchar", nullable: true})
  lastName: string;

  @Column({type:"varchar"})
  userName: string;

  @Column({type:"varchar"})
  email: string;

  @Column({type:"varchar", default: "TYPE-EXPRESS"})
  origin: string;

  @Column({type:"varchar", default: "MYNOTES"})
  services: string;
} 
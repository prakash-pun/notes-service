import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  originId: number;

  @Column()
  ownerUserName: string;

  @Column({ length: 50 }) 
  title: string;

  @Column({ length: 100, nullable: true}) 
  subTitle: string;

  @Column({type: "varchar", default: "notes/defalut.png", nullable: true}) 
  noteImage: string;

  @Column({ length: 100, nullable: true}) 
  tags: string;

  @Column({ length: 1000 }) 
  content: string;

  @Column({ type: "timestamptz", default: "now()" }) 
  createdAt: Date;
}
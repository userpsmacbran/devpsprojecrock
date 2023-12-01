import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('companys')
export class Company extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({type: "varchar", nullable: false})
  fullName: string

  @Column({type: "varchar", nullable: false})
  email: string

  @Column({type: "varchar", nullable: false})
  password: string

  @Column({type: "varchar", nullable: false})
  identification: string

  @Column({type: "varchar", nullable: false})
  logo: string

  @Column({type: "varchar", nullable: false})
  typeCompany: string

  @Column({type: "varchar", nullable: false})
  country: string

  @Column({type: "varchar", nullable: false})
  city: string

  @Column({type: "varchar", nullable: false})
  adress: string

  @Column({type: "date", nullable: false})
  birthDate: Date

  @Column({type: "timestamp", name: 'created_at'})
  createdAt: string

  @Column({type: "timestamp", name: 'updated_at'})
  updatedAt: string

}
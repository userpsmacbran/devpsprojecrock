import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('rock_users')
export class User extends BaseEntity{

  @PrimaryGeneratedColumn('increment')
  r_id: number;

  @Column({type: "varchar", nullable: false})
  r_name: string

  @Column({type: "varchar", nullable: false})
  r_last_Name: string

  @Column({type: "varchar", nullable: false, unique: true})
  r_email: string

  @Column({type: "varchar", nullable: false})
  r_pass_word: string

  @Column({type: "varchar", nullable: false})
  r_country: string

  @Column({type: "varchar", nullable: false})
  r_city: string

  @Column({type: "varchar", nullable: false})
  r_adress: string

  @Column({type: "int", nullable: false})
  r_type: number

  @Column({type: "varchar", nullable: false})
  r_logo: string

  @Column({type: "varchar", nullable: false})
  r_code_Phone: string

  @Column({type: "varchar", nullable: false, unique: true})
  r_phone: string

  @Column({type: "date", nullable: false})
  r_birth_Date: Date

  @Column({type: "int", nullable: true})
  r_state_Wallet: number

  @Column({type: "int", nullable: true})
  r_state_User: number

  @Column({type: "varchar", nullable: true})
  r_tocken: string

}
import { ROLES, STATES } from "src/constants";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ModePlay } from "./modePlay.entity";
import { Exclude } from "class-transformer";
import { Wallet } from "./wallet.entity";
import { Owner } from "./owner.entity";
@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({ type: "varchar", nullable: true })
  last_Name: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  email: string;

  @Exclude()
  @Column({ type: "varchar", nullable: false })
  pass_word: string;

  @Column({ type: "varchar", nullable: false })
  country: string;

  @Column({ type: "varchar", nullable: false })
  city: string;

  @Column({ type: "varchar", nullable: false })
  adress: string;

  @Column({ type: "enum", enum: ROLES })
  type: ROLES;

  @Column({ type: "varchar", nullable: false })
  logo: string;

  @Column({ type: "varchar", nullable: false })
  code_Phone: string;

  @Column({ type: "varchar", nullable: false })
  phone: string;

  @Column({ type: "date", nullable: true })
  birth_Date: Date;

  @Column({ type: "varchar", nullable: true })
  ruc?: String;

  @Column({
    type: "enum",
    enum: STATES,
    default: 0,
    nullable: true,
  })
  state_Wallet: STATES;

  @Column({
    type: "enum",
    enum: STATES,
    default: 0,
    nullable: true,
  })
  state_User: STATES.ACTIVO;

  @OneToOne(() => Wallet, (wallet) => wallet.user)
  @JoinColumn()
  wallet: Wallet;

  @ManyToMany(() => ModePlay, { cascade: true })
  @JoinTable()
  modePlays: ModePlay[];

  @OneToOne(() => Owner, (owner) => owner.user)
  @JoinColumn()
  owner: Owner;

  @Column({ default: false, nullable: true })
  isVerified: boolean;

  @Column({ nullable: true })
  verificationCode: string;
}

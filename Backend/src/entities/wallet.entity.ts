import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("r_wallet")
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  r_id: number;

  @Column({ type: "varchar", length: 255 })
  r_amount: string;

  @Column({ type: "date" })
  r_last_Update: Date;

  @OneToOne(() => User, (user) => user.wallet, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;
}

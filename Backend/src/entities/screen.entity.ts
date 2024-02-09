import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Screen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  active: boolean;

  @ManyToOne(() => User, (user) => user.screens)
  @JoinColumn({ name: "companyId" })
  company: User;
}

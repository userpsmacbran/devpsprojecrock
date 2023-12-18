import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MODEPLAY, NAME_MODEPLAY } from "src/constants";
import { User } from "./user.entity";

@Entity("r_mode_plays")
export class ModePlay extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  r_id: number;

  @Column({ type: "int" })
  r_id_company: number;

  @Column({ type: "int" })
  r_cost: number;

  @Column({ type: "enum", enum: NAME_MODEPLAY })
  r_title: NAME_MODEPLAY;

  @Column({ type: "enum", enum: MODEPLAY })
  r_type: MODEPLAY;

  @ManyToMany(() => User, (empresa) => empresa.modePlays)
  empresas: User[];
}

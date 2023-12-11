import { ROLES, STATES } from 'src/constants';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ModePlay } from './modePlay.entity';
import { Exclude } from 'class-transformer';

@Entity('rock_users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  r_id: number;

  @Column({ type: 'varchar', nullable: false })
  r_name: string;

  @Column({ type: 'varchar', nullable: false })
  r_last_Name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  r_email: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: false })
  r_pass_word: string;

  @Column({ type: 'varchar', nullable: false })
  r_country: string;

  @Column({ type: 'varchar', nullable: false })
  r_city: string;

  @Column({ type: 'varchar', nullable: false })
  r_adress: string;

  @Column({ type: 'enum', enum: ROLES })
  r_type: ROLES;

  @Column({ type: 'varchar', nullable: false })
  r_logo: string;

  @Column({ type: 'varchar', nullable: false })
  r_code_Phone: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  r_phone: string;

  @Column({ type: 'date', nullable: false })
  r_birth_Date: Date;

  @Column({
    type: 'enum',
    enum: STATES,
    default: 0,
    nullable: true
  })
  r_state_Wallet: STATES;

  @Column({
    type: 'enum',
    enum: STATES,
    default: 0,
    nullable: true
  })
  r_state_User: STATES.ACTIVO;

  @Exclude()
  @Column({ type: 'int', default: 20 })
  r_wallet?: number = 20;

  @ManyToMany(() => ModePlay, { cascade: true })
  @JoinTable()
  modePlays: ModePlay[];
}

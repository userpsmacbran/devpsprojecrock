import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('r_member_ships')
export class Membership extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  r_id: number;

  @Column({ type: 'int' })
  r_type: number;

  @Column({ type: 'date' })
  r_init_Date: Date;

  @Column({ type: 'date' })
  r_exp_Date: Date;

  @Column({ type: 'int' })
  r_state: number;
}

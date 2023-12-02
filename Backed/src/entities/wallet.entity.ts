import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('r_wallet')
export class Membership extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  r_id: number;

  @Column({ type: 'int' })
  r_count: number;

  @Column({ type: 'date' })
  r_last_Update: Date;
}

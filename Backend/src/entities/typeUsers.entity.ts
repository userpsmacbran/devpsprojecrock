import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('r_type_users')
export class Membership extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  r_id: number;

  @Column({ type: 'varchar' })
  r_name: string;

  @Column({ type: 'boolean' })
  r_activated: boolean;
}

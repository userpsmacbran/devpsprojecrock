import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('r_transac_tions')
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  r_id: number;

  @Column({ type: 'int' })
  r_id_User: number;

  @Column({ type: 'int' })
  r_amount: number;

  @Column({ type: 'int' })
  r_type_T: number;
}

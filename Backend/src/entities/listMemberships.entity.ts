import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('r_list_Member_ships')
export class listMembership extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  r_id: number;

  @Column({ type: 'varchar' })
  r_name: string;

  @Column({ type: 'int' })
  r_type: number;

  @Column({ type: 'int' })
  r_count_Divice: number;

  @Column({ type: 'int' })
  r_count_Skin: number;

  @Column({ type: 'int' })
  r_count_Employes: number;

  @Column({ type: 'boolean' })
  r_modifi_Price: boolean;
}

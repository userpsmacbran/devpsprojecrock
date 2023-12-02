import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('r_type_permissions')
export class TypePermission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  r_id: number;

  @Column({ type: 'int' })
  r_permmision: number;

  @Column({ type: 'varchar' })
  r_title: string;

  @Column({ type: 'varchar' })
  r_description: string;
}

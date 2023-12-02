import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('r_companys')
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  r_id: number;

  @Column({ type: 'varchar', nullable: false })
  r_name: string;

  @Column({ type: 'varchar', nullable: false })
  r_email: string;

  @Column({ type: 'varchar', nullable: false })
  r_ruc: string;

  @Column({ type: 'varchar', nullable: false })
  r_logo: string;

  @Column({ type: 'int', nullable: false })
  r_id_Type_Company: number;

  @Column({ type: 'varchar', nullable: false })
  r_country: string;

  @Column({ type: 'varchar', nullable: false })
  r_city: string;

  @Column({ type: 'varchar', nullable: false })
  r_adress: string;

  @Column({ type: 'varchar', nullable: false })
  r_codePhone: string;

  @Column({ type: 'varchar', nullable: false })
  r_phone: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: string;

  @Column({ type: 'timestamp', name: 'updated_at' })
  updatedAt: string;
}

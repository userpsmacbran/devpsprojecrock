import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MODEPLAY } from 'src/constants';

@Entity('r_play_list_companys')
export class PlayListCompany extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  r_id: number;

  @Column({ type: 'varchar', nullable: false })
  r_id_video: string;

  @Column({ type: 'int', nullable: false })
  r_id_company: number;

  @Column({ type: 'int' })
  r_id_user: number;

  @Column({ type: 'enum', enum: MODEPLAY })
  r_order: MODEPLAY;

  @Column({ type: 'text' })
  r_duration: string;

  @Column({ type: 'int' })
  r_state: number;

  @Column({ type: 'varchar' })
  r_title: string;

  @Column({ type: 'varchar' })
  r_description: string;

  @Column({ type: 'varchar' })
  r_thumbnails_default: string;

  @Column({ type: 'varchar' })
  r_thumbnails_medium: string;

  @Column({ type: 'varchar' })
  r_thumbnails_high: string;

  @Column({ type: 'boolean' })
  fullScreen: boolean;
}

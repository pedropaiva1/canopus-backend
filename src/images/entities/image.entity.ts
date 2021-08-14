import { CarouselEntity } from 'src/carousels/entities/carousel.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'images' })
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @ManyToOne(type => CarouselEntity, carousel => carousel.id)
  carousel: number

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

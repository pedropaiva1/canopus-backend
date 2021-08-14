import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from 'src/users/entities/user.entity';
import { ImageEntity } from 'src/images/entities/image.entity';

@Entity({ name: 'carousels' })
export class CarouselEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, unique: true, nullable: false })
  title: string;

  @ManyToOne(type => UserEntity, author => author.id, { eager: true })
  author: string;

  @OneToMany(type => ImageEntity, image => image.id)
  images: ImageEntity[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

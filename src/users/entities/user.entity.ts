import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CarouselEntity } from 'src/carousels/entities/carousel.entity';
@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty({ example: 'f0e2a32c-abc0-4d2f-afed-0c660265eff9' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'pedro' })
  @Column({ type: 'varchar', length: 200, unique: true, nullable: false })
  name: string;

  @ApiProperty({ example: 'pedro.paivahmp@gmail.com' })
  @Column({ type: 'varchar', length: 200, unique: true, nullable: false })
  email: string;

  @ApiProperty({ example: '12341234' })
  @Column({ type: 'varchar', length: 200, nullable: false })
  password: string;

  @OneToMany(type => CarouselEntity, carousels => carousels.author)
  carousels: CarouselEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

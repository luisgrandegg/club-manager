import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/user.entity';

@Entity('clubs')
export class Club {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({ example: 'FC Example' })
  name: string;

  @Column({ length: 500, default: '' })
  @ApiProperty({ example: 'A premier football club' })
  description: string;

  @Column({ length: 100 })
  @ApiProperty({ example: 'Madrid' })
  city: string;

  @Column()
  @ApiProperty({ example: 1, description: 'ID of the user who created the club' })
  ownerId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;
}

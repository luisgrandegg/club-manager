import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true, type: 'text' })
  refreshToken: string | null;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  // Clubs will be referenced here via foreign key (not directly imported to avoid circular deps)
}

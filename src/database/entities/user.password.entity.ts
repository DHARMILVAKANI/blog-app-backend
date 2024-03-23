import { Entity, JoinColumn, OneToOne, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from 'src/database/entities/user.entity';

@Entity('UserPassword')
export class UserPassword extends BaseEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ type: 'varchar' })
  passwordHash: string;
}

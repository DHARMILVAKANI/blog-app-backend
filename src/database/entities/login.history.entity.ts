import { User } from 'src/database/entities/user.entity';
import { LoginType } from 'src/common/constant';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';

@Entity('LoginHistory')
export class LoginHistory extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ type: 'text' })
  token: string;

  @Column({ type: 'enum', enum: LoginType, default: LoginType.WEB })
  type: LoginType;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}

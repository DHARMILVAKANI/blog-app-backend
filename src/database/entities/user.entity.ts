import { Column, Entity, OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserPassword } from 'src/database/entities/user.password.entity';
import { LoginHistory } from 'src/database/entities/login.history.entity';
import { Posts } from 'src/database/entities/posts.entity';

@Entity('User')
export class User extends BaseEntity {
  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  bio: string;

  @Column({ type: 'varchar', nullable: true })
  profilePicture: string;

  @OneToOne(() => UserPassword, (pass) => pass.user)
  userPassword: UserPassword;

  @OneToMany(() => LoginHistory, (ulh) => ulh.user)
  loginHistory: LoginHistory;

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];
}

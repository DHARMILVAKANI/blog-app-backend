import { BaseEntity } from 'src/database/entities/base.entity';
import { User } from 'src/database/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('Posts')
export class Posts extends BaseEntity {
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;
}

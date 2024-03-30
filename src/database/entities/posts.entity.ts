import { BaseEntity } from 'src/database/entities/base.entity';
import { Category } from 'src/database/entities/category.entity';
import { Tag } from 'src/database/entities/tag.entity';
import { User } from 'src/database/entities/user.entity';
import { Column, Entity, ManyToOne, ManyToMany } from 'typeorm';

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

  @ManyToMany(() => Category)
  category: Category[];

  @ManyToMany(() => Category)
  tag: Tag[];
}

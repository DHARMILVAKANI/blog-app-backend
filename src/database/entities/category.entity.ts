import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Posts } from 'src/database/entities/posts.entity';

@Entity('Category')
export class Category extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => Posts)
  @JoinTable({ name: 'post_categories' })
  posts: Posts[];
}

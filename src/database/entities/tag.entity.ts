import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Posts } from 'src/database/entities/posts.entity';

@Entity('Tag')
export class Tag extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => Posts)
  @JoinTable({ name: 'post_tags' })
  posts: Posts[];
}

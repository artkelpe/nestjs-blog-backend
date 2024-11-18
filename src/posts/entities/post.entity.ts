import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  perex: string;

  @Column()
  content: string;

  @CreateDateColumn()
  create_dt: string;

  @UpdateDateColumn()
  update_dt: string;

  @OneToMany(() => Comment, (comment: Comment) => comment.post)
  comments: Comment[];

  constructor(title: string, perex: string, content: string, comments: Comment[], id?: number) {
    if (id) this.id = id;
    this.title = title;
    this.perex = perex;
    this.content = content;
    this.comments = comments;
  }
}

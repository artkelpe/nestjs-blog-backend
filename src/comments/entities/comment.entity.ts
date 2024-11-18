import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vote } from '../../votes/entities/vote.entity';
import { Post } from '../../posts/entities/post.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author_ip: string;

  @Column()
  content: string;

  @CreateDateColumn()
  create_dt: string;

  @OneToMany(() => Vote, (vote: Vote) => vote.comment)
  @Exclude()
  votes: Vote[];

  @ManyToOne(() => Post, (post: Post) => post.comments, { nullable: false, onDelete: 'CASCADE' })
  post: Post;

  @Expose()
  rating?: number;
}

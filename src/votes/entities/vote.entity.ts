import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author_ip: string;

  @Column()
  value: number;

  @ManyToOne(() => Comment, (comment: Comment) => comment.votes, { nullable: false, onDelete: 'CASCADE' })
  comment: Comment;
}

import { Expose, Type } from 'class-transformer';
import { GetCommentDto } from '../../comments/dto/get-comment.dto';

export class GetPostDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly title: string;

  @Expose()
  readonly perex: string;

  @Expose()
  readonly content: string;

  @Expose()
  readonly create_dt: string;

  @Expose()
  readonly update_dt: string;

  @Expose()
  @Type(() => GetCommentDto)
  readonly comments: GetCommentDto[];
}

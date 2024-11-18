import { Exclude, Expose } from 'class-transformer';

export class GetCommentDto {
  @Expose()
  id: number;

  @Exclude()
  authorIp: string;

  @Expose()
  content: string;

  @Expose()
  create_dt: string;

  @Expose()
  rating: number;
}

import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetPostsDto {
  @Expose()
  readonly id: number;
  @Expose()
  readonly title: string;
  @Expose()
  readonly perex: string;
}

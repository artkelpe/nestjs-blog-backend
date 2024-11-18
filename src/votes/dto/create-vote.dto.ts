import { IsIn, IsNumber } from 'class-validator';
export class CreateVoteDto {
  @IsNumber()
  @IsIn([-1, 1])
  value: number;
}

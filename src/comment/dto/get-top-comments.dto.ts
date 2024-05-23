import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetTopCommentsDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  count: number = 10;
}

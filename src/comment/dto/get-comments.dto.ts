import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class GetCommentsDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  albumId: number;
}

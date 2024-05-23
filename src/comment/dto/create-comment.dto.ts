import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  albumId: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  content: string;
}

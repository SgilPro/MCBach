import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class EditCommentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  content: string;
}

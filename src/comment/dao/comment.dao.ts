import { CommentSelect } from '../select';
import { Prisma } from '@prisma/client';

export type CommentVo = Prisma.CommentGetPayload<{
  include: typeof CommentSelect;
}>;

export type CommentDao = Omit<
  CommentVo & { name: string; likesCount: number },
  'user' | '_count'
>;

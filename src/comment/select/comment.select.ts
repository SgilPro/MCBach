export const CommentSelect = {
  id: true,
  content: true,
  userId: true,
  user: {
    select: {
      firstName: true,
      lastName: true,
    },
  },
  albumId: true,
  _count: {
    select: {
      likes: true,
    },
  },
};

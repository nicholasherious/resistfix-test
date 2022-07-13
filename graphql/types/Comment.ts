import { extendType, nonNull, objectType, stringArg } from 'nexus';

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.string('id');
    t.string('text');
    t.string('authorId');
    t.string('postId');
    t.field('user', {
      type: 'User',
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.comment
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .user();
      },
    });
    t.field('post', {
      type: 'Post',
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.comment
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .post();
      },
    });
  },
});

// Query

export const CommentsQuery = extendType({
  type: 'Query',
  definition(t) {
    // Get all Comments
    t.nonNull.list.field('comments', {
      type: 'Comment',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.comment.findMany({
          orderBy: { createdAt: 'desc' },
        });
      },
    });
  },
});


// Mutations 

// Create Comment
export const CommentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createComment', {
      type: 'Comment',
      args: {
        text: nonNull(stringArg()),
        authorId: stringArg(),
        postId: stringArg(),
      },
      async resolve(_parent, { text, authorId, postId }, ctx) {
        return await ctx.prisma.comment.create({
          data: { text, authorId, postId },
        });
      },
    });
  },
})


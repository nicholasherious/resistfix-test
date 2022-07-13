import { objectType, extendType, nonNull, intArg, arg, stringArg } from 'nexus';
import { AuthenticationError } from 'apollo-server-errors';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.string('id');
    t.string('title');
    t.string('url');
    t.string('description');
    t.string('imageUrl');
    t.string('category');
    t.string('authorId');
    t.field('user', {
      type: 'User',
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.post
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .user();
      },
    });
    t.list.field('comments', {
      type: 'Comment',
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.post
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .comments();
      },
    });
  },
});

export const PostsQuery = extendType({
  type: 'Query',
  definition(t) {
    // Get all Posts
    t.nonNull.list.field('posts', {
      type: 'Post',
      resolve(_parent, _args, ctx) {
        console.log(ctx.session);
        return ctx.prisma.post.findMany({
          orderBy: { createdAt: 'desc' },
        });
      },
    });

    // Single Post
    t.field('singlePost', {
      type: 'Post',
      args: {
        postId: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.post.findUnique({
          where: { id: args.postId },
        });
      },
    });
  },
});

// Mutations

export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // Create Post
    t.field('createPost', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        url: stringArg(),
        description: stringArg(),
        imageUrl: stringArg(),
        category: stringArg(),
        authorId: stringArg(),
      },
      resolve(
        _parent,
        { title, url, description, imageUrl, category, authorId },
        ctx
      ) {
        // if (!ctx.session) {
        //   throw new AuthenticationError(
        //     'You must be logged in to create a post'
        //   );
        // }
        return ctx.prisma.post.create({
          data: {
            title,
            url,
            description,
            imageUrl,
            category,
            authorId,
          },
        });
      },
    });
    //Edit Post
    t.field('editPost', {
      type: 'Post',
      args: {
        id: nonNull(stringArg()),
        title: nonNull(stringArg()),
        url: stringArg(),
        description: stringArg(),
        imageUrl: stringArg(),
        category: stringArg(),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.post.update({
          where: { id: args.id },
          data: {
            title: args.title,
            url: args.url,
            description: args.description,
            imageUrl: args.imageUrl,
            category: args.category,
          },
        });
      },
    });
    // Delete Post
    t.field('deletePost', {
      type: 'Post',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.post.delete({
          where: { id: args.id },
        });
      },
    });
  },
});

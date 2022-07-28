import NextAuth from 'next-auth';
import RedditProvider from 'next-auth/providers/reddit';
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default NextAuth({
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    session: async ({ session, user }) => {
      session.userId = user.id;

      return Promise.resolve(session);
    },
  },
});

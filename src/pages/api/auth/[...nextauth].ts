import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'

import { NextApiHandler } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.PROVIDER_GITHUB_ID,
      clientSecret: process.env.PROVIDER_GITHUB_SECRET,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({
    prisma,
  }),

  secret: process.env.AUTH_SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
    // This is used to get the user id so that you can do db queries
    // on the user.
    jwt: async (token, user) => {
      if (user) {
        token.uid = user.id
      }
      return Promise.resolve(token)
    },
    session: async (session, user) => {
      session.user.id = user.uid
      return Promise.resolve(session)
    },
  },
}

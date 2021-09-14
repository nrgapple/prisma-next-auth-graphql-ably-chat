import { objectType, extendType, stringArg, nonNull } from 'nexus'
import { getSession } from 'next-auth/client'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('email')
    t.string('image')
    t.date('createdAt')
    t.date('updatedAt')
  },
})

export const UserQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('user', {
      type: 'User',
      resolve: async (_, __, { prisma, req }) => {
        const session = await getSession({ req })
        return prisma.user.findUnique({
          where: { id: session.user.id },
        })
      },
    })
  },
})

export const UserMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createOneUser', {
      type: 'User',
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
      },
      resolve: (_, { name, email }, ctx) => {
        return ctx.prisma.user.create({
          data: {
            name,
            email,
          },
        })
      },
    })
  },
})

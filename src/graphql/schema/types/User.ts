import { objectType, extendType, stringArg, nonNull, intArg } from 'nexus'
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
    t.field('profile', {
      type: Profile,
    })
  },
})

export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.int('id'), t.list.field('chats', { type: Chat })
    t.date('createdAt')
  },
})

export const Chat = objectType({
  name: 'Chat',
  definition(t) {
    t.int('id')
    t.date('createdAt')
    t.list.field('messages', { type: Message })
  },
})

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.int('id')
    t.int('chatId')
    t.string('sender'), t.string('message')
    t.date('createdAt')
  },
})

export const UserQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('user', {
      type: User,
      resolve: async (_, __, { prisma, req }) => {
        const session = await getSession({ req })
        return prisma.user.findUnique({
          where: { id: session.user.id },
          include: {
            profile: {
              include: {
                chats: true,
              },
            },
          },
        })
      },
    })
  },
})

export const MessagesQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('messages', {
      type: Message,
      args: { chatId: intArg() },
      resolve: async (_, { chatId }: { chatId: number }, { prisma }) => {
        return prisma.message.findMany({
          where: { chatId: chatId },
        })
      },
    })
  },
})

export const UserMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createOneUser', {
      type: User,
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

export const MessagesMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createMessage', {
      type: Message,
      args: {
        chatId: intArg(),
        message: stringArg(),
      },
      resolve: async (_, { chatId, message }: { chatId: number; message: string }, { prisma, req }) => {
        const session = await getSession({ req })
        return prisma.message.create({
          data: {
            chatId: chatId,
            senderId: session.user.id,
            message: message,
          },
        })
      },
    })
  },
})

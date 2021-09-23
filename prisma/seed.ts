import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'nick@test.com',
    name: 'nick',
  },
  {
    email: 'ruddy@test.com',
    name: 'ruddy',
  },
]

export async function main() {
  try {
    console.log(`Start seeding ...`)
    for (const u of userData) {
      const user = await prisma.user.create({
        data: u,
      })
      console.log(`Created user with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()

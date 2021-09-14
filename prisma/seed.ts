import { PrismaClient, ProfileStatus, ReferType, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'nick@test.com',
    name: 'nick',
    profile: {
      create: {
        type: ReferType.referrer,
        referrer: {
          create: {
            status: ProfileStatus.looking,
            company: {
              create: {
                name: 'Facebook',
              },
            },
          },
        },
        referent: {
          create: {
            status: ProfileStatus.disabled,
            yearsExp: 0,
          },
        },
      },
    },
  },
  {
    email: 'ruddy@test.com',
    name: 'ruddy',
    profile: {
      create: {
        type: ReferType.referent,
        referrer: {
          create: {
            status: ProfileStatus.disabled,
            company: undefined,
          },
        },
        referent: {
          create: {
            status: ProfileStatus.looking,
            yearsExp: 4,
            experiences: {
              create: [
                {
                  name: 'Cool Place to Work',
                  title: 'Lead Dev',
                  description: '- The man there.\n -Could not be better.',
                },
              ],
            },
            jobPostings: {
              create: [
                {
                  name: 'Staff Dev',
                  company: {
                    connect: {
                      id: 1,
                    },
                  },
                  url: 'https://www.facebook.com/careers/v2/jobs/4006578832705963/?location=Washington%2C%20DC&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic',
                },
              ],
            },
          },
        },
      },
    },
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

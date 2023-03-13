const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {

  const alice = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Alice Alicedotter",
      phoneNumber: "1111111111",
      email: "alice@alice.com",
      restaurants: {
        create: {
          name: "Alice's Appetizer's",
          address: "2630 Sasamat St, Vancouver, BC V6R 2J1",
          items: {
            create: {
              name: "1 Appetizer",
              priceCents: 300,
              estTime: 8
            }
          }
        }
      }
    }
  })

  const bob = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Bob Bobson",
      phoneNumber: "2222222222",
      email: "bob@bob.com",
      restaurants: {
        create: {
          name: "Bob's Bakery",
          address: "4434 W 10th Ave, Vancouver, BC V6R 1H9",
          items: {
            create: {
              name: "1 baked good",
              priceCents: 200,
              estTime: 2
            }
          }
        }
      }
    }
  })

  const craig = await prisma.user.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Craig Craigson",
      phoneNumber: "3333333333",
      email: "craig@craig.com",
      restaurants: {
        create: {
          name: "Craig's Eggs",
          address: "4473 W 10th Ave, Vancouver, BC V6R 2H8",
          items: {
            create: {
              name: "1 egg",
              priceCents: 100,
              estTime: 5
            }
          }
        }
      }
    }
  })

  console.log(alice, bob, craig)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
import { prisma } from '../../../server/db/client';


export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':

      const {
        name,
        address,
        userId
      } = req.body;

      const restaurant = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          restaurants: {
            create: {
              name,
              address
            }
          }
        }
      })

      res.status(201).json(restaurant)
      prisma.$disconnect()
      break
    

    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
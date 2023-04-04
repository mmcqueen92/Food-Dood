import { prisma } from '../../../../server/db/client';


export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':

      let {
        name, restaurantId, priceCents, estTime, description
      } = req.body;

      estTime = parseInt(estTime);

      const item = await prisma.item.create({

        data: {
          name,
          restaurantId,
          priceCents,
          estTime,
          description
        }
      })

      res.status(201).json(item)
      prisma.$disconnect()
      break


    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
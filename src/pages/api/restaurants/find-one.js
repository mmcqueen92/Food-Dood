import { prisma } from '../../../../server/db/client';


export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':

      let {
        restaurantId
      } = req.body;



      const restaurant = await prisma.restaurant.findUnique({
        where: {
          id: restaurantId
        }
      })

      // console.log("inside find, items: ", items)

      res.status(201).json(restaurant)
      prisma.$disconnect()
      break


    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
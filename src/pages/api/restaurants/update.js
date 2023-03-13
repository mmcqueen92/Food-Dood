import { prisma } from '../../../../server/db/client';


export default async function handler(req, res) {
  const { method } = req;
  
  
  switch (method) {
    case 'POST':

      const {type, newValue, restaurantId} = req.body;

      if (type === "updateName") {
        const restaurant = await prisma.restaurant.update({
          where: {
            id: restaurantId
          },
          data: {
            name: newValue
          }
        })
  
        res.status(201).json(restaurant)
        prisma.$disconnect()
        break
      }

      if (type === "updateAddress") {
        const restaurant = await prisma.restaurant.update({
          where: {
            id: restaurantId
          },
          data: {
            address: newValue
          }
        })
  
        res.status(201).json(restaurant)
        prisma.$disconnect()
        break
      }
    

    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
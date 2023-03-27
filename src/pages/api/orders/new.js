import { prisma } from '../../../../server/db/client';
import { Prisma } from '@prisma/client';


export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':

      let {
        cart,
        gst,
        deliveryFee,
        email,
        userId,
        restaurantId,
        prepTime,
        deliveryTime,
        address
      } = req.body;

      deliveryFee = deliveryFee.price;
      gst = gst.price;


      const items = cart.map((item) => {
        const itemId = item.id;
        const itemQuantity = item.itemQuantity;
        return { itemId, itemQuantity }

      })




      const order = await prisma.order.create({

        data: {
          gst,
          deliveryFee,
          email,
          userId,
          restaurantId,
          prepTime,
          deliveryTime,
          address
       
        }
      })



      res.status(201).json(order)
      prisma.$disconnect()
      break


    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
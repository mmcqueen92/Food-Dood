import { prisma } from '../../../../server/db/client';

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'POST':
      let data = req.body;
      const cart = data.cart;
      const orderId = data.id;


      const cleanData = cart.map((item) => {
        const itemId = item.id;
        const name = item.name;
        const price = item.price;
        const quantity = item.itemQuantity;


        return {
          orderId,
          itemId,
          quantity
        }
      })

      const orderItems = cleanData.map(async (orderItem) => {
        await prisma.orderItem.create({
          data: orderItem
        })
      })

      res.status(201).json(orderItems)
  }
}


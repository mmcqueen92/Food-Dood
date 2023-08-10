import { prisma } from '../../../../server/db/client';

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'POST':
      const {orderId} = req.body;

      const orderItems = prisma.orderItem.findMany({
        where: {
          orderId: orderId
        }
      })

      res.status(201).json(orderItems)
  }
}
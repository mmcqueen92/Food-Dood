import { prisma } from '../../../../server/db/client';


export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':

      let {
        driverId, orderId, userId
      } = req.body;





      try {
        await prisma.order.update({
          where: {
            id: orderId
          },
          data: {
            driverId: driverId

          }
        })



      } catch {
        res.status(500).send({ error: 'failed to fetch data' })
      }





 
      res.status(201).json(order)
      prisma.$disconnect()
      break

    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}
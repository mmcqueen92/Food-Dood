import { prisma } from '../../../../server/db/client';


export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':

      let {
        id, status
      } = req.body;






      const order = await prisma.order.update({
        where: {
          id: id
        },
        data: {
          status: status

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
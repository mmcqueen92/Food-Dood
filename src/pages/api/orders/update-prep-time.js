import { prisma } from '../../../../server/db/client';


export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':

      let {
        id, prepTime
      } = req.body;



      const parsedPrepTime = parseInt(prepTime)


      const order = await prisma.order.update({
        where: {
          id: id
        },
        data: {
          prepTime: parsedPrepTime

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
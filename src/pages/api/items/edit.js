import { prisma } from '../../../../server/db/client';


export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':

      let {
        type, name, priceCents, estTime, id, description
      } = req.body;

      estTime = parseInt(estTime);
      priceCents = parseInt(priceCents);

      const item = await prisma.item.update({
        where: {
          id: id
        },

        data: {
          name,
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
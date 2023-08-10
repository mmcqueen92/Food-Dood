import { prisma } from '../../../../server/db/client';


export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':

      let {
        itemIds
      } = req.body;



      const items = itemIds.map(async (itemId) => {
        const thingy = await prisma.item.findUnique({
          where: {
            id: itemId
          }
        })
        return thingy
      })


      res.status(201).json(items)
      prisma.$disconnect()
      break


    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
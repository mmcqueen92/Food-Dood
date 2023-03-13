import { prisma } from '../../../../server/db/client';


export default async function handler(req, res) {
  const userId = req.query.params[0];
  const { method } = req;




  switch (method) {
    case 'GET':




      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(userId)
        },
      })

      res.status(201).json(user)
      prisma.$disconnect()
      break


    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
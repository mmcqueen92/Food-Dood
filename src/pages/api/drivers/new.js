import {prisma} from '../../../../server/db/client'

export default async function handler(req, res) {
  const {method} = req;

  switch (method) {
    case 'POST':

    let {userId} = req.body;

    const driver = await prisma.driver.create({
      data: {
        userId
      }
    })

    res.status(201).json(driver)
    prisma.$disconnect()
    break
  }
}
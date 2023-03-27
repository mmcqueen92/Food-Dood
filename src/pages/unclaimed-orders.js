import { prisma } from '../../server/db/client'
import { useSession } from "next-auth/react"
import UnclaimedReadyForPickupList from '@/components/unclaimed-ready-for-pickup-list'
import UnclaimedPaidOrdersList from '@/components/unclaimed-paid-orders-list'
import { useEffect, useState } from 'react'
import axios from 'axios'

export async function getServerSideProps() {
  const paidOrders = await prisma.order.findMany({
    where: {
      status: "paid",
      driverId: null
    }
  })

  const readyForPickupOrders = await prisma.order.findMany({
    where: {
      status: "ready-for-pickup",
      driverId: null
    }
  })

  return {
    props: {
      paidOrders,
      readyForPickupOrders
    }
  }
}


export default function UnclaimedOrders(props) {
  const { data: session } = useSession();
  const [driver, setDriver] = useState()
  const paidOrders = props.paidOrders
  const readyForPickupOrders = props.readyForPickupOrders

  let userId;
  if (session) {
    userId = session.user.id;

  }

  useEffect(() => {
    if (session) {

      const data = { userId }

      axios.post('/api/drivers/find', data)
        .then((res) => {
          setDriver(res.data[0])
        })

    }
  }, [])

  if (session) {


    return (
      <div className='flex flex-row justify-evenly'>
        <div className='border-2 border-green-500'>
          <UnclaimedPaidOrdersList
            orders={paidOrders}
            driver={driver}
            userId={userId}
          ></UnclaimedPaidOrdersList>
        </div>

        <div className='border-2 border-green-500'>
          <UnclaimedReadyForPickupList
            orders={readyForPickupOrders}
            driver={driver}
            userId={userId}
          ></UnclaimedReadyForPickupList>
        </div>

      </div>
    )
  } else {
    return (
      <></>
    )
  }

}
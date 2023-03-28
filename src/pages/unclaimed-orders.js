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
      <div className='flex flex-col items-center'>
        <div className='flex flex-row justify-evenly border-2 border-blue-800 m-5 p-5 rounded-md bg-green-400 w-4/5'>
          <div className='border-2 border-blue-800 p-2 rounded-md bg-slate-200'>
            <UnclaimedPaidOrdersList
              orders={paidOrders}
              driver={driver}
              userId={userId}
            ></UnclaimedPaidOrdersList>
          </div>

          <div className='border-2 border-blue-800 p-2 rounded-md bg-slate-200'>
            <UnclaimedReadyForPickupList
              orders={readyForPickupOrders}
              driver={driver}
              userId={userId}
            ></UnclaimedReadyForPickupList>
          </div>

        </div>
      </div>
    )
  } else {
    return (
      <></>
    )
  }

}
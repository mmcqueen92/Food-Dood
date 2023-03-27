import { useSession, getSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react";
import { prisma } from '../../server/db/client'
import Link from "next/link";
import DriverActiveOrder from "@/components/driver-active-order";

export async function getServerSideProps({ query }) {
  const parsed = parseInt(Object.keys(query))

  const drivers = await prisma.driver.findMany({
    where: {
      userId: parsed
    },
    include: {
      orders: true
    }
  })

  const driver = drivers[0];
  const driverId = driver.id;

  const orders = await prisma.order.findMany({
    where: {
      driverId: driverId
    }
  })

  const activeOrders = orders.map((order) => {
    if (order.status === "ready-for-pickup" || order.status === "en-route" || order.status === "paid") {

      return order
    }
  })

  const filteredOrders = activeOrders.filter((order) => {
    return order !== undefined
  })

  const activeOrder = filteredOrders[0];

  if (activeOrder) {
    const restaurantId = activeOrder.restaurantId;
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id:restaurantId
      }
    })
    return {
      props: {
        driver,
        orders,
        activeOrder,
        restaurant
      }
    }

  } else {
    return {
      props: {
        driver,
        orders,
      }
    }
  }


}

export default function DriverDashboard(props) {
  const { data: session } = useSession();
  const orders = props.orders;
  const activeOrder = props.activeOrder;
  const restaurant = props.restaurant;

  if (session) {
    return (
      <div className="flex flex-row justify-evenly">

        <div>
          <h1>Active Orders:</h1>
          {activeOrder && (
            <DriverActiveOrder
              activeOrder={activeOrder}
              restaurant={restaurant}
            ></DriverActiveOrder>
          )}
        </div>

        <Link
          href={{
            pathname: '/unclaimed-orders',

          }}
        >Link to Unclaimed Orders</Link>



      </div>
    )
  } else {
    return (
      <></>
    )
  }

}
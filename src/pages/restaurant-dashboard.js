import RestaurantActiveOrdersList from "@/components/restaurant-active-orders-list";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { prisma } from "../../server/db/client";

export async function getServerSideProps({ query }) {

  const parsed = parseInt(Object.keys(query))


  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id: parsed
    }
  });

  const items = await prisma.item.findMany({
    where: {
      restaurantId: parsed
    }
  })


  const orders = await prisma.order.findMany({
    where: {
      restaurantId: parsed,
      status: "paid"
    },
    include: {
      orderItems: true
    }
  })


  return {
    props: {
      restaurant,
      items,
      orders,

    }
  }
}

export default function RestaurantDashboard(props) {
  const { data: session } = useSession()
  const name = props.restaurant.name;
  const id = props.restaurant.id;
  const address = props.restaurant.address;
  const orders = props.orders;
  const items = props.items




  if (session.user.id === props.restaurant.UserId) {
    return (
      <div className="flex flex-row justify-center">

        <div className="flex flex-col items-center border-2 border-blue-800 w-4/5 rounded-md m-5 p-2 bg-green-400">
          <div className="flex flex-col items-center">
            <div className="text-xl underline">
              Restaurant Dashboard
            </div>
            <div className="text-xl underline">
              {name}
            </div>
            <div className="m-2">
              Located at: {address}
            </div>

          </div>
          <div className="flex flex-row justify-center">

            <div>
              <RestaurantActiveOrdersList
                orders={orders}
                items={items}
              ></RestaurantActiveOrdersList>
            </div>
            <div className="flex flex-col">
              <Link
                href={{
                  pathname: '/update-restaurant',
                  query: id
                }}
              >
                <button className="border-2 border-blue-800 bg-slate-200 hover:bg-blue-700 hover:text-slate-200 p-1 mx-5 mb-1 rounded-md">Update Restaurant</button>
              </Link>
              <Link
                href={{
                  pathname: '/restaurant-data',
                  query: id
                }}
              >
                <button className="border-2 border-blue-800 bg-slate-200 hover:bg-blue-700 hover:text-slate-200 p-1 mx-5 mb-1 rounded-md">Data</button>
              </Link>
            </div>
          </div>



        </div>
      </div>
    )
  }
}
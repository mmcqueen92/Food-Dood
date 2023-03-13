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
  const session = useSession();
  const name = props.restaurant.name;
  const id = props.restaurant.id;
  const address = props.restaurant.address;
  const orders = props.orders;
  const items = props.items
  console.log("orders: ", orders)



  if (session.data.user.id === props.restaurant.UserId) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div>
            This is the Restaurant Dashboard for {name}
          </div>
          <div>
            Located at {address}
          </div>

        </div>
        <div>
          <Link
            href={{
              pathname: '/update-restaurant',
              query: id
            }}
          >
            <button className="border-2 border-green-500 m-1 p-1 rounded-md">Update Restaurant</button>
          </Link>
        </div>


        <div>
          Active Orders section will go here<br></br>
          <RestaurantActiveOrdersList
            orders={orders}
            items={items}
          ></RestaurantActiveOrdersList>
        </div>


      </div>
    )
  }
}
import { useContext, useEffect } from "react";
import { CartContext } from "@/context/cartContext";
import { prisma } from '../../server/db/client'
import Link from "next/link";
import axios from 'axios';

export async function getServerSideProps({ query }) {

  const parsed = parseInt(Object.keys(query))

  const order = await prisma.order.update({
    where: {
      id: parsed
    },
    data: {
      status: "paid"
    }
  });


  order.createdAt = order.createdAt.toString()
  order.updatedAt = order.updatedAt.toString()


  const orderItems = await prisma.orderItem.findMany({
    where: {
      orderId: parsed
    },
  })

  const restId = order.restaurantId;

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id: restId
    }
  })

  // const items = orderItems.map(async (orderItem) => {
  //   const itemId = orderItem.itemId
  //   const returnThing = await prisma.item.findUnique({
  //     where: {
  //       id: itemId
  //     }
  //   })
  //   return returnThing
  // })

  // console.log("items: ", items)

  return {
    props: {
      order,
      orderItems,
      restaurant
    }
  }
}

export default function Success(props) {
  const { cart, emptyCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext)
  const order = props.order;
  const orderItems = props.orderItems;
  const restaurant = props.restaurant;
  const itemIds = props.orderItems.map((orderItem) => {
    const itemId = orderItem.itemId
    return itemId;
  })
  let items;
  console.log("order: ", order)
  console.log("order items: ", orderItems)
  console.log("itemIds: ", itemIds)
  console.log("restaurant: ", restaurant)

  useEffect(() => {
    const endpoint = "/api/items/find"
    const data = { itemIds }

    axios.post(endpoint, data)
      .then((res) => {
        console.log("res: ", res)
      })

  }, [])

  useEffect(() => {

    emptyCart();
    console.log("this is the cart now: ", cart)
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div className="bg-green-400 m-5 w-2/5 rounded-md">
        <div className="flex justify-center bg-green-400 rounded-md">
          <div className="bg-slate-200 m-5 rounded-md w-4/5 flex flex-col items-center border-2 border-blue-800">
            <div className="text-xl underline m-2">
              Order Successful
            </div>

            <Link
              href="/profile"
            >
              <button className="border-2 border-blue-800 rounded-md m-2 p-1 hover:bg-blue-700 hover:text-slate-200">
                Track your Order
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
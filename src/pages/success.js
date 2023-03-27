import { useContext, useEffect } from "react";
import { CartContext } from "@/context/cartContext";
import { prisma } from '../../server/db/client'
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

    }
  }
}

export default function Success(props) {
  const { cart, emptyCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext)
  const itemIds = props.orderItems.map((orderItem) => {
    const itemId = orderItem.itemId
    return itemId;
  })
  let items;

  useEffect(() => {
    const endpoint = "/api/items/find"
    const data = { itemIds }

    axios.post(endpoint, data)
      .then((res) => {
        console.log("resserino: ", res)
      })

  }, [])

  useEffect(() => {
    console.log("props: ", props)
    emptyCart();
  }, [])

  return (
    <div>
      <div>Order successful</div>

    </div>
  );
}
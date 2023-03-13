import MenuList from "@/components/menu-list";
import Cart from "../components/cart";
import { prisma } from '../../server/db/client'
import { AddressContext } from "@/context/addressContext";
import { useContext } from "react";

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

  return {
    props: {
      restaurant,
      items
    }
  }
}

export default function ViewRestaurant(props) {
  const { address, setAddress } = useContext(AddressContext)
  return (
    <>
    User Address: {address}<br></br>
      This is the View Restaurant page for:<br></br>
      <h1>
        {props.restaurant.name}
      </h1>
      Located at {props.restaurant.address}
      <br></br>
      <div className="flex flex-row">
        <MenuList
          items={props.items}
        ></MenuList>
        <Cart></Cart>
      </div>
    </>
  )
}
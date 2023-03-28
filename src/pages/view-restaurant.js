import MenuList from "@/components/menu-list";
import Cart from "../components/cart";
import { prisma } from '../../server/db/client'
import { AddressContext } from "@/context/addressContext";
import { useContext, useState } from "react";
import axios from "axios"

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
  const API_KEY = process.env.COORDS_API_KEY
  return {
    props: {
      restaurant,
      items,
      API_KEY
    }
  }
}

export default function ViewRestaurant(props) {
  const { address, setAddress } = useContext(AddressContext)
  const [location, setLocation] = useState();

  const API_KEY = props.API_KEY

  const getCoords = () => {


    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
        axios.get(`http://api.positionstack.com/v1/reverse?access_key=${API_KEY}&query=${latitude},${longitude}`)
          .then((res) => {
            setAddress(res.data.data[0].name)
          })
      })
    }
  }


  return (
    <div
      className="m-2 p-2 border-2 border-blue-700 rounded-md bg-green-400"
    >
      <div>
        <input
          className='border-2 border-blue-700 rounded-md p-1'
          type="text"
          placeholder="Enter an Address"
          value={address}
          onChange={(event) =>
            setAddress(
              event.target.value,
            )
          }
        ></input>
        <button
          className='m-1 p-1 rounded-md border-2 border-blue-700 bg-slate-200 text-blue-800 hover:bg-blue-700 hover:text-slate-200'
          onClick={getCoords}>Or Click Here</button>

      </div>

      <div className="font-bold text-4xl text-blue-800 underline">
        {props.restaurant.name}
      </div>
      <div className="text-blue-800">
        Located at {props.restaurant.address}
      </div>
      <br></br>
      <div className="flex flex-row">
        <MenuList
          items={props.items}
        ></MenuList>
        <Cart></Cart>
      </div>
    </div>
  )
}
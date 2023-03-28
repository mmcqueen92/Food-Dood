import { useContext, useState } from 'react'
import { prisma } from '../../server/db/client'
import NearbyRestaurantsList from '@/components/nearby-restaurants-list';
import { AddressContext } from "@/context/addressContext";
import axios from "axios"


export async function getServerSideProps() {
  const restaurants = await prisma.restaurant.findMany();
  const API_KEY = process.env.COORDS_API_KEY
  return {
    props: {
      restaurants,
      API_KEY
    }
  }
}

export default function NearbyRestaurants(props) {
  const [restaurants, setRestaurants] = useState(props.restaurants);
  const [location, setLocation] = useState();
  const { address, setAddress } = useContext(AddressContext)
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
      className='flex flex-col items-center m-2 p-2'
    >
      <div
      className='bg-green-400 m-2 p-2 border-2 border-blue-700 rounded-md'
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
          className="m-2 border-blue-700 border-2 bg-slate-200 text-blue-800 rounded-md p-1 hover:bg-blue-700 hover:text-slate-200"
          onClick={getCoords}>Or Click Here</button>

        </div>
        <NearbyRestaurantsList
          restaurants={restaurants}
          userAddress={address}
          setAddress={setAddress}
        />

      </div>
    </div>
  )
}
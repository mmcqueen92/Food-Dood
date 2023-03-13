import { useContext, useState } from 'react'
import { prisma } from '../../server/db/client'
import NearbyRestaurantsList from '@/components/nearby-restaurants-list';
import { AddressContext } from "@/context/addressContext";
import axios from "axios"

const API_KEY = process.env.COORDS_API_KEY

export async function getServerSideProps() {
  const restaurants = await prisma.restaurant.findMany();
  return {
    props: {
      restaurants
    }
  }
}

export default function NearbyRestaurants(props) {
  const [restaurants, setRestaurants] = useState(props.restaurants);
  const [location, setLocation] = useState();
  const { address, setAddress } = useContext(AddressContext)

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
    <>
    <input
    type="text" 
    placeholder="Enter an Address"
    value={address}
    onChange={(event) =>
      setAddress(
        event.target.value,
      )
    }
    ></input>
    <button onClick={getCoords}>Or Click Here</button>
      <NearbyRestaurantsList
        restaurants={restaurants}
        userAddress={address}
        setAddress={setAddress}
        />
    </>
  )
}
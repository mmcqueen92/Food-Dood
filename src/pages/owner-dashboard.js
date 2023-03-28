import { prisma } from '../../server/db/client'
import { useSession } from "next-auth/react"
import { useState } from 'react'
import ProfileViewRestaurantsList from '../components/profile-view-restaurants-list'
import AddNewRestaurant from '../components/add-new-restaurant';

export async function getServerSideProps({ query }) {
  const userId = parseInt(Object.keys(query))

  const restaurants = await prisma.restaurant.findMany({
    where: {
      UserId: userId
    }
  })

  return {
    props: {
      restaurants,
      userId
    }
  }

}

export default function OwnerDashboard(props) {
  const { data: session } = useSession();
  const restaurants = props.restaurants;
  const userId = props.userId;

  const [createNewRestaurant, setCreateNewRestaurant] = useState(false)
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")

  const addNewRestaurant = () => {
    setCreateNewRestaurant(true)
  }

  const cancelNewRestaurant = () => {
    setCreateNewRestaurant(false)
  }

  if (session.user.id === userId) {

    if (restaurants) {
      return (
        <div className="flex flex-row justify-center">
          <div className='flex flex-col m-2 p-2 rounded-md w-1/3 bg-green-400'>
            <div className='flex flex-row justify-between'>
              <div
              className='text-2xl rounded-md m-5'
              >Restaurants:</div>
              {!createNewRestaurant && (
                <button
                  onClick={addNewRestaurant}
                  className='bg-slate-200 m-5 p-1 rounded-md border-blue-600 border-2'>Add New Restaurant</button>
              )}

              {createNewRestaurant && (
                 <button
                 onClick={cancelNewRestaurant}
                 className='bg-slate-200 m-5 p-1 rounded-md border-blue-600 border-2'>Cancel</button>
              )}
            </div>
            {!createNewRestaurant && (
              <ProfileViewRestaurantsList
                restaurants={restaurants}
              ></ProfileViewRestaurantsList>
            )}

            {createNewRestaurant && (
              <AddNewRestaurant
              name={name}
              setName={setName}
              address={address}
              setAddress={setAddress}
              ></AddNewRestaurant>
            )}


          </div>
        </div>

      )
    }
  }

}
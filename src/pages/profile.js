import { useSession, signIn } from "next-auth/react"
import { useState, useEffect } from "react";
import ProfileOptions from "@/components/profile-options";
import axios from 'axios';




export default function Profile(props) {
  const { data: session } = useSession()

  const [user, setUser] = useState(props.user)
  const [restaurants, setRestaurants] = useState((props.restaurants))

  useEffect(() => {
    if (session) {
      const userId = session.user.id

  
      const usersEndpoint = `/api/users/${userId}`;
      const restaurantsEndpoint = `/api/restaurants/${userId}`
  
      const getUserData = async () => {
        await axios.get(usersEndpoint)
          .then((res) => {

            setUser(res.data);
          })
      }
  
      const getUserRestaurants = async () => {
        await axios.get(restaurantsEndpoint)
        .then((res) => {

          setRestaurants(res.data)
        })
      }
  
      getUserData();
      getUserRestaurants();
    }
  }, [])

  if (session) {

    return (
      <div className="flex flex-col items-center border-2 border-red-500 m-2">
        <div className="flex flex-row justify-center border-2 border-red-500 m-2">
          {session.user.name || session.user.email}'s Profile
        </div>
        <div className="flex flex-col border-2 border-green-500 max-w-sm w-full">
          <ProfileOptions
          restaurants={restaurants}
          ></ProfileOptions>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <div className="flex flex-column m-2">
          Please sign in to view this page
        </div>
        <button className="border-2 border-red-700 rounded-md p-1 m-2" onClick={() => signIn()}>Sign in</button>
      </>
    )
  }

}
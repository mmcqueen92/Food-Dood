import { useSession, signIn } from "next-auth/react"
import { useState, useEffect } from "react";
import ProfileOptions from "@/components/profile-options";
import axios from 'axios';
import Link from "next/link";
import ProfileActiveOrdersList from "@/components/profile-active-orders-list";




export default function Profile() {
  const { data: session } = useSession()

  const [user, setUser] = useState()
  const [restaurants, setRestaurants] = useState()
  let orders = [];
  let activeOrders = [];
  let userId;
  let driverId;

  useEffect(() => {
    if (session) {
      userId = session.user.id


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


  if (user) {

    orders = user.orders;
    if (orders) {
      activeOrders = orders.map((order) => {
        if (order.status === 'paid' || order.status === 'ready-for-pickup' || order.status === 'en-route') {
          return order;
        }
      })
      activeOrders = activeOrders.filter((order) => {
        return order !== undefined;
      })
    }
    driverId = user.driverId[0];
    userId = user.id;

  }


  const registerAsDriver = async () => {
    const data = { userId }
    const endpoint = '/api/drivers/new'

    await axios.post(endpoint, data)

  }


  console.log("userId bish: ", userId)
  if (session) {

    return (
      <div className="flex flex-col items-center border-2 border-green-500 m-2 rounded-md">
        <div className="flex flex-row justify-center border-2 border-green-500 m-2 rounded-md">
          {session.user.name || session.user.email}'s Profile
        </div>
        <div className="flex flex-row p-2 m-2 w-3/5 justify-between">

          <ProfileActiveOrdersList
            orders={activeOrders}
          ></ProfileActiveOrdersList>
          <div className="flex flex-col">
          {!driverId && (
            <button
              className="border-2 border-green-500 rounded-md m-2 p-2"
              onClick={registerAsDriver}
            >Register as Driver</button>
          )}
          {driverId && (
            <Link
              href={{
                pathname: '/driver-dashboard',
                query: userId
              }}
            >
              <button className="border-2 border-green-500 rounded-md m-1 p-1">
                Driver Dashboard
              </button>
            </Link>
          )}
          <Link
            href={{
              pathname: 'owner-dashboard',
              query: userId
            }}
          >
            <button className="border-2 border-green-500 rounded-md m-1 p-1">Owner Dashboard</button>
          </Link>

          </div>
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
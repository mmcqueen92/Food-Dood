import { useSession, signIn } from "next-auth/react"
import { useState, useEffect } from "react";
import ProfileOptions from "@/components/profile-options";
import axios from 'axios';
import Link from "next/link";
import ProfileActiveOrdersList from "@/components/profile-active-orders-list";




export default function Profile() {
  const { data: session } = useSession();

  const [user, setUser] = useState();
  const [restaurants, setRestaurants] = useState();
  const [orderFilter, setOrderFilter] = useState("pending");

  const [orders, setOrders] = useState([])
  const [activeOrders, setActiveOrders] = useState([])
  const [completedOrders, setCompletedOrders] = useState([])
  const [userId, setUserId] = useState();
  const [driverId, setDriverId] = useState();




  useEffect(() => {

    if (session) {

      setUserId(session.user.id)

      const tempUserId = session.user.id;



      const usersEndpoint = `/api/users/${tempUserId}`;
      const restaurantsEndpoint = `/api/restaurants/${tempUserId}`

      const getUserData = async () => {

        await axios.get(usersEndpoint)
          .then((res) => {

            setUser(res.data);
            setOrders(res.data.orders);
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
  }, [session])

  useEffect(() => {
    if (user) {

      if (orders) {

        let newActiveOrders = orders.map((order) => {

          if (order.status === 'paid' || order.status === 'ready-for-pickup' || order.status === 'en-route') {

            return order;
          }
        })
        newActiveOrders = newActiveOrders.filter((order) => {
          return order !== undefined;
        })

        setActiveOrders(newActiveOrders)

        let newCompletedOrders = orders.map((order) => {
          if (order.status === 'delivered') {
            return order
          }
        })
        newCompletedOrders = newCompletedOrders.filter((order) => {
          return order !== undefined;
        })
        setCompletedOrders(newCompletedOrders);
      }

      setUserId(user.id)
      setDriverId(user.driverId[0])

    }

  }, [user])



  const registerAsDriver = async () => {
    const data = { userId }
    const endpoint = '/api/drivers/new'

    await axios.post(endpoint, data)

  }



  if (session) {

    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center border-2 border-blue-800 m-5 rounded-md bg-green-400 w-3/5">
          <div className="flex flex-row justify-center border-2 border-blue-800 bg-slate-200 text-xl p-2 m-5 rounded-md">
            {session.user.name || session.user.email}'s Profile
          </div>
          <div className="flex flex-row p-2 m-2 w-3/5 justify-between">
            <div>
              <label
                className="m-2"
              >Show:</label>
              <select
                onChange={(event) => {
                  setOrderFilter(event.target.value)
                }}
                className="m-2 rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="all">All</option>
                <option value="completed">Completed</option>
              </select>
              {orderFilter === "pending" && (
                <ProfileActiveOrdersList
                  orders={activeOrders}
                ></ProfileActiveOrdersList>

              )}

              {orderFilter === "all" && (
                <ProfileActiveOrdersList
                  orders={orders}
                ></ProfileActiveOrdersList>
              )}


              {orderFilter === "completed" && (
                <ProfileActiveOrdersList
                  orders={completedOrders}
                ></ProfileActiveOrdersList>
              )}

            </div>
            <div className="flex flex-col">
              {!driverId && (
                <button
                  className="border-2 border-blue-800 rounded-md m-1 p-1 bg-slate-200"
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
                  <button className="border-2 border-blue-800 rounded-md m-1 p-1 bg-slate-200">
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
                <button className="border-2 border-blue-800 bg-slate-200 rounded-md m-1 p-1">Owner Dashboard</button>
              </Link>

            </div>
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
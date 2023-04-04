import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function UnclaimedPaidOrdersListItem(props) {
  const router = useRouter();
  const order = props.order;
  const driver = props.driver;
  const userId = props.userId;
  let driverId;

  if (driver) {
    driverId = props.driver.id
  }


  const orderId = order.id;
  const [restaurant, setRestaurant] = useState({})

  useEffect(() => {
    const restaurantId = order.restaurantId;
    const getRestaurantdata = async () => {
      const endpoint = 'api/restaurants/find-one'
      const data = { restaurantId }
      await axios.post(endpoint, data)
        .then((res) => {
          setRestaurant(res.data)
        })
    }

    getRestaurantdata()
  }, [])
  
  const claimOrder = async () => {
    const data = { driverId, orderId, userId }
    const endpoint = 'api/orders/update-driver'
    await axios.post(endpoint, data)
      .then((res) => {
        router.push(`/driver-dashboard?${userId}`)
      })
  }
  return (
    <div className="border-2 border-blue-800 m-2 p-2 rounded-md bg-green-200">
      <div className="underline">
        Order #: {order.id}<br></br>
      </div>
      Restaurant Address: {restaurant.address}<br></br>
      Delivery Address: {order.address}<br></br>
      <button
        onClick={claimOrder}
        className="border-2 border-blue-800 rounded-md p-1 m-1 bg-slate-200 hover:bg-blue-700 hover:text-slate-200">Claim Order</button>
    </div>
  )
}
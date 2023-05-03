import { useState, useEffect } from "react";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";


export default function UnclaimedReadyForPickupListItem(props) {
  const router = useRouter();
  const order = props.order
  const userId = props.userId;
  const [restaurant, setRestaurant] = useState({})
  const driver = props.driver;
  let driverId;

  if (driver) {
    driverId = props.driver.id;
  }

  const orderId = order.id;

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
      <div>
        <div className="underline">
          Order #: {order.id}<br></br>
        </div>
      Restaurant Address: {restaurant.address}<br></br>
      Delivery Address: {order.address}<br></br>
      </div>
      <button
        onClick={claimOrder}
        className="border-2 border-blue-800 rounded-md p-1 m-1 bg-slate-200">Claim Order</button>
    </div>
  )


}
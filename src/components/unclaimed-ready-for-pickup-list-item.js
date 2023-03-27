import { useState, useEffect } from "react";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";


export default function UnclaimedReadyForPickupListItem(props) {
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
    const data = {driverId, orderId, userId}
    const endpoint = 'api/orders/update-driver'
    await axios.post(endpoint, data)

  }

  return (
    <>
      Order #: {order.id}<br></br>
      Restaurant Address: {restaurant.address}<br></br>
      Delivery Address: {order.address}<br></br>
      <button 
      onClick={claimOrder}
      className="border-2 border-green-500">Claim Order</button>
    </>
  )


}
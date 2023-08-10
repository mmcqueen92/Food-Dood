import { useState } from "react";
import moment from "moment";
import axios from "axios";

export default function DriverActiveOrder(props) {
  const order = props.activeOrder;
  const [orderStatus, setOrderStatus] = useState(order.status)
  const restaurant = props.restaurant;


  if (order) {
    const createdAt = order.createdAt;

    const prepTime = order.prepTime;

    const deliveryTime = order.deliveryTime;

    const totalTime = prepTime + deliveryTime;

    const pickupTime = moment(createdAt).add(prepTime, 'm').toDate();

    const parsedPickupTime = pickupTime.toString()

    const pickupSlice = parsedPickupTime.slice(16, 21)

    const dropoffTime = moment(createdAt).add(totalTime, 'm').toDate();

    const parsedDropoffTime = dropoffTime.toString();

    const dropoffSlice = parsedDropoffTime.slice(16, 21);

    const pickupOrder = async () => {
      const endpoint = '/api/orders/update-status';
      const id = order.id;
      const status = "en-route"
      const data = { id, status }

      await axios.post(endpoint, data)
        .then((res) => {
          setOrderStatus(res.data.status)
        })
    }

    const dropoffOrder = async () => {
      const endpoint = '/api/orders/update-status';
      const id = order.id;
      const status = "delivered"
      const data = { id, status }

      await axios.post(endpoint, data)
        .then((res) => {
          setOrderStatus(res.data.status)
        })
    }
    return (
      <div className="border-2 border-blue-800 rounded-md p-2 bg-green-200">
        Restaurant Id: {restaurant.id}<br></br>
        Restaurant Name: {restaurant.name}<br></br>
        Restaurant Address: {restaurant.address}<br></br>
        Pickup Time:  {pickupSlice}<br></br>
        Delivery Time: {dropoffSlice}<br></br>
        Delivery Address: {order.address}<br></br>
        Status: {orderStatus}<br></br>

        {orderStatus === "ready-for-pickup" && (
          <button
            className="border-2 border-blue-800 m-1 p-1 rounded-md bg-slate-200 hover:bg-blue-700 hover:text-slate-200"
            onClick={pickupOrder}
          >Pickup Order</button>
        )}

        {orderStatus === "en-route" && (
          <button
            className="border-2 border-blue-800 m-1 p-1 rounded-md bg-slate-200 hover:bg-blue-700 hover:text-slate-200"
            onClick={dropoffOrder}
          >Drop Off Order</button>
        )}

      </div>
    )

  }



} 

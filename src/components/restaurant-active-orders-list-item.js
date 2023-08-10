import OrderItem from "./order-item";
import moment from "moment";
import { useState } from "react";
import axios from "axios";

// THIS IS A SINGLE ORDER WITH MULTIPLE ORDERITEMS
export default function RestaurantActiveOrdersListItem(props) {
  const [order, setOrder] = useState(props.order)
  const [editPrepTime, setEditPrepTime] = useState("inactive");
  const [newPrepTime, setNewPrepTime] = useState(order.prepTime);
  const [orderStatus, setOrderStatus] = useState("prep");
  const id = props.id;
  const items = props.items

  const itemObjs = order.orderItems.map((item) => {
    const itemId = item.itemId;
    const quantity = item.quantity;
    const itemObjArray = items.filter((obj) => {
      return obj.id === itemId
    })
    const itemObj = itemObjArray[0];
    Object.assign(itemObj, { quantity })
    return itemObj;
  })

  const itemComponents = itemObjs.map((item) => {
    return (
      <OrderItem
        name={item.name}
        quantity={item.quantity}
        key={item.id}
        id={item.id}
      ></OrderItem>
    )
  })

  const parsedDate = order.createdAt.toString()

  const createdAtSlice = parsedDate.slice(16, 21)

  const createdAt = order.createdAt;

  const prepTime = order.prepTime;

  const readyForPickup = moment(createdAt).add(prepTime, 'm').toDate();

  const parsedPickup = readyForPickup.toString()

  const pickupSlice = parsedPickup.slice(16, 21)

  const savePrepTime = async (event) => {
    event.preventDefault();
    const prepTime = newPrepTime;
    const data = { id, prepTime };
    const endpoint = "api/orders/update-prep-time";

    await axios.post(endpoint, data)
      .then((res) => {
        const newOrder = order;
        newOrder.prepTime = newPrepTime
        setEditPrepTime("inactive")
        setOrder(newOrder)
      })
  }

  const orderReady = async (event) => {
    const status = "ready-for-pickup"
    const data = { id, status }
    const endpoint = "api/orders/update-status"
    await axios.post(endpoint, data)
      .then((res) => {
        setOrderStatus("ready-for-pickup")
      })

  }

  return (
    <div className="border-2 border-blue-800 bg-green-200 m-2 p-2 rounded-md flex flex-col items-center">

      <div className="underline font-bold">Order ID: {order.id}</div>

      <div className="flex flex-row">
        <div className="bg-slate-200 rounded-md p-1 border-2 border-blue-800">
          {itemComponents}

        </div>
        <div className="p-2">
          <div className="mb-5">

            Created at: {createdAtSlice}
          </div>


          {editPrepTime === "inactive" && (
            <div className="flex flex-row justify-between">
              Prep Time: {order.prepTime}
              <button
                className="border-2 border-blue-800 m-1 p-1 rounded-md bg-slate-200 hover:bg-blue-700 hover:text-slate-200"
                onClick={() => {
                  setEditPrepTime("active")
                }}
              >Adjust Prep Time</button>
            </div>


          )}

          {editPrepTime === "active" && (
            <div>
              <form
                onSubmit={savePrepTime}
              >
                <label htmlFor="newPrepTime"></label>
                <input
                  type="number"
                  className="rounded-md border-2 border-blue-800 m-1 p-1"
                  onChange={(event) => {
                    setNewPrepTime(event.target.value)
                  }}
                  value={newPrepTime}
                  id="newPrepTime"
                  name="newPrepTime"
                ></input>
                <button
                  className="border-2 border-blue-800 rounded-md p-1 m-1 bg-slate-200"
                  type="submit"
                >Save</button>
              </form>
            </div>
          )}



          {orderStatus === "prep" && (
            <div>
              Ready for Pickup at: {pickupSlice}

              <button
                className="border-2 border-blue-800 m-1 p-1 rounded-md bg-slate-200 hover:bg-blue-700 hover:text-slate-200"
                onClick={orderReady}
              >Ready for Pickup</button>

            </div>
          )}

          {orderStatus === "ready-for-pickup" && (
            <div>
              Order is ready for pickup
            </div>
          )}
        </div>
      </div>


    </div>
  )
}
import { useEffect } from "react";
import RestaurantActiveOrdersListItem from '../components/restaurant-active-orders-list-item'

// THIS IS A LIST OF MULTIPLE ORDERS
export default function RestaurantActiveOrdersList(props) {
const orders = props.orders;
const items = props.items;


const orderComponents = orders.map((order) => {
  return (

    <RestaurantActiveOrdersListItem
      key={order.id}
      id={order.id}
      order={order}
      items={items}
    ></RestaurantActiveOrdersListItem>
   
  )


})

return (
  <div>
    {orderComponents}

  </div>
)

}
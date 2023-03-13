import OrderItem from "./order-item";

// THIS IS A SINGLE ORDER WITH MULTIPLE ORDERITEMS
export default function RestaurantActiveOrdersListItem(props) {
  const order = props.order;
  const items = props.items
  console.log("order: ", order)
  console.log("items: ", items)

  const itemObjs = order.orderItems.map((item) => {
    const itemId = item.itemId;
    const quantity = item.quantity;
    const itemObjArray = items.filter((obj) => {
    return obj.id === itemId
    })
    const itemObj = itemObjArray[0];
    Object.assign(itemObj, {quantity})
    return itemObj;
  })

  console.log("itemObjs: ", itemObjs)

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


  return (
    <div className="border-2 border-green-500 m-2 p-2">
      <h1>Order ID: {order.id}</h1>
{itemComponents}

    </div>
  )
}
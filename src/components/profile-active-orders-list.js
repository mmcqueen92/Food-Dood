import ProfileActiveOrdersListItem from "./profile-active-orders-list-item";

export default function ProfileActiveOrdersList(props) {
  const orders = props.orders
  let orderComponents;


  if (orders) {
    orderComponents = orders.map((order) => {
      return (
        <ProfileActiveOrdersListItem
          order={order}
          key={order.id}
        ></ProfileActiveOrdersListItem>
      )
    })
  }


  return (
    <div className="flex flex-col border-2 border-blue-800 bg-slate-200 rounded-md max-w-sm w-full m-2 p-2">
      {orders.length === 0 && (
        <div className="flex justify-center">
          No pending orders
        </div>
      )}
      {orders.length > 0 && (
        <div>
          <h1 className="flex justify-center">
          Orders:
          </h1>
          {orderComponents}
        </div>
      )}

    </div>
  )
}
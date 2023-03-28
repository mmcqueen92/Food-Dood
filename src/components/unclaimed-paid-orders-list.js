import UnclaimedPaidOrdersListItem from "./unclaimed-paid-orders-list-item";

export default function UnclaimedPaidOrdersList(props) {
  const orders = props.orders;
  const driver = props.driver;
  const userId = props.userId

  let components;

  if (orders) {
    components = orders.map((order) => {
      return (
        <UnclaimedPaidOrdersListItem
          key={order.id}
          order={order}
          driver={driver}
          userId={userId}
        ></UnclaimedPaidOrdersListItem>
      )
    })

  }

  return (
    <div className="m-2">
      <h1 className="underline">Unclaimed Paid Orders:</h1>
      {components}
    </div>
  )

}
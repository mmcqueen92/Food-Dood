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
    <>
    <h1>Unclaimed Paid Orders:</h1>
    {components}
    </>
  )

}
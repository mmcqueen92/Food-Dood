import UnclaimedReadyForPickupListItem from "./unclaimed-ready-for-pickup-list-item"

export default function UnclaimedReadyForPickupList(props) {
  const orders = props.orders;
  const driver = props.driver;
  const userId = props.userId

  let components;

  if (orders) {
    components = orders.map((order) => {
      return (
        <UnclaimedReadyForPickupListItem
          key={order.id}
          order={order}
          driver={driver}
          userId={userId}
        ></UnclaimedReadyForPickupListItem>
      )
    })

  }

  return (
    <div className="m-2">
      <h1 className="underline">Unclaimed Ready-for-Pickup Orders</h1>
      {components}
    </div>
  )

}
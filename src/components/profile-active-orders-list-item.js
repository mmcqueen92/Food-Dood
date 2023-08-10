import moment from "moment";

export default function ProfileActiveOrdersListItem(props) {
  const order = props.order;

  const createdAt = order.createdAt;

  const prepTime = order.prepTime;

  const deliveryTime = order.deliveryTime;

  const totalTime = prepTime + deliveryTime;

  const eta = moment(createdAt).add(totalTime, 'm').toDate();

  const parsedEta = eta.toString();

  const etaSlice = parsedEta.slice(16, 21)




  return (
    <div className="border-2 border-blue-800 m-1 p-1 rounded-md bg-green-200">
      Order Id: {order.id} <br></br>
      Order email: {order.email} <br></br>
      Order status: {order.status} <br></br>
      Order address: {order.address} <br></br>
      ETA: {etaSlice}
    </div>
  )
}
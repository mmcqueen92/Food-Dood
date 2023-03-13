export default function OrderItem(props) {
  const name = props.name;
  const quantity = props.quantity;
  return (
    <div>
      Item: {name}<br></br>
      Quantity: {quantity}
    </div>
  )

}
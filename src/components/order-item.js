export default function OrderItem(props) {
  const name = props.name;
  const quantity = props.quantity;
  return (
    <div className="flex flex-row justify-between">
      <div>
        Item: {name}
      </div>
      <div>
        x{quantity}

      </div>
    </div>
  )

}
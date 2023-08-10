import OrderListItem from "./order-list-item";

export default function OrderList(props) {

  const itemsArray = props.items

  let totalPrice = 0;

  const componentArray = itemsArray.map((item) => {

    const totalItemPrice = item.price * item.itemQuantity;
    totalPrice += totalItemPrice;

    return (
      <OrderListItem
        key={item.id}
        id={item.id}
        name={item.name}
        price={item.price}
      ></OrderListItem>
    )
  });

  const totalPriceDollars = totalPrice / 100;

  return (
    <div>
      <div>
        {componentArray}
      </div>
      <div className="flex justify-end">
        Total Price: ${totalPriceDollars}
      </div>
    </div>
  )
}
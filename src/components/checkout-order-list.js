import CheckoutOrderListItem from "./checkout-order-list-item";


export default function CheckoutOrderList(props) {

  const itemsArray = props.items
  const totalItemPrice = props.totalItemPrice;
  const deliveryFee = props.deliveryFee;
  const customerGst = props.customerGst;
  const totalPriceDollars = props.totalPriceDollars || 0;

  const componentArray = itemsArray.map((item) => {
    return (
      <CheckoutOrderListItem
        key={item.id}
        id={item.id}
        name={item.name}
        price={item.price}
      ></CheckoutOrderListItem>
    )
  });



  return (
    <div>
      <div className="p-1">
        {componentArray}
      </div>
      <div className="border-t-2 border-blue-800 p-1 m-1">
        Subtotal: ${totalItemPrice / 100}<br></br>
        Delivery Fee: ${deliveryFee / 100} <br></br>
        GST: ${customerGst}<br></br>
        Total Price: ${totalPriceDollars.toFixed(2)}
      </div>
    </div>
  )
}
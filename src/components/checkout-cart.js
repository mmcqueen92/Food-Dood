import { CartContext } from "../context/cartContext"
import { useContext } from "react"
import CheckoutOrderList from "./checkout-order-list";
import StripePayment from "./stripe-payment";


export default function CheckoutCart (props) {
  const items = props.items
  const totalItemPrice = props.totalItemPrice;
  const deliveryFee = props.deliveryFee;
  const customerGst = props.customerGst;
  const totalPriceDollars = props.totalPriceDollars || 0;

  return (
    <div className="border-2 border-yellow-600 w-2/5 rounded-md m-2 p-2">
      <h1>Your Order:</h1>
      <CheckoutOrderList
        items={items}
        totalItemPrice={totalItemPrice}
        deliveryFee={deliveryFee}
        customerGst={customerGst}
        totalPriceDollars={totalPriceDollars}
      ></CheckoutOrderList>
    </div>
  )
}
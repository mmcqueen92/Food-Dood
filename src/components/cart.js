import { CartContext } from "../context/cartContext"
import { useContext } from "react"
import OrderList from "./order-list";
import StripePayment from "./stripe-payment";
import GoToPay from "./go-to-pay";

export default function Cart(props) {
  const { cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, emptyCart } = useContext(CartContext)
  return (
    <div className="border-2 border-yellow-600 w-2/5 rounded-md m-2 p-2 h-min">
      <h1>Your Order:</h1>
      <OrderList
        items={cart}
      ></OrderList>
      {cart.length > 0 && (
        <div className="flex justify-end">
          <GoToPay></GoToPay>
        </div>
      )}

      {cart.length > 0 && (
        <div className="flex flex-col justify-end">
          <button
            onClick={emptyCart}
            className="border-2 border-red-500 p-1 rounded-md w-1/3"
          >Clear Cart</button>
        </div>
      )}


    </div>
  )
}
import { CartContext } from "../context/cartContext"
import { useContext } from "react"

export default function CheckoutOrderListItem(props) {
  const { cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext)
  const id = props.id;
  const name = props.name;
  let quantity = 0

  cart.forEach(item => {
    if (item.id === id) {
      quantity = item.itemQuantity
    }
  });

  const price = (props.price * quantity) / 100;

  return (
    <div className="flex flex-row justify-between m-1">
      <div>
        {name}
      </div>
      <div>
        Quantity:
      </div>
      {quantity}
      <div>
        Price: ${price}
      </div>
    </div>
  )
}
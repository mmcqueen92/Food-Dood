import { CartContext } from "../context/cartContext"
import { useContext } from "react"

export default function OrderListItem(props) {
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
    <div className="flex flex-row justify-between">
      <div>
        {name}
      </div>
      <div>
        Quantity: 
      </div>
      <button onClick={() => {decreaseQuantity(id)}}
        className="border-2 border-slate-600 w-7 m-1 rounded-full">-</button>
        {quantity}
      <button onClick={() => {increaseQuantity(id)}}
      className="border-2 border-slate-600 w-7 m-1 rounded-full">+</button>
      <div>
        Price: ${price}
      </div>
    </div>
  )
}
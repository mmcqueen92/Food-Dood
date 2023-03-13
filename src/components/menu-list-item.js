import { useContext, useState, useEffect } from "react"
import { CartContext } from "../context/cartContext"

export default function MenuListItem(props) {
  const { cart, addToCart, removeFromCart } = useContext(CartContext)
  const [exists, setExists] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1)

  const priceDollars = props.priceCents / 100;
  const id = props.id;
  const name = props.name;
  const price = props.priceCents;
  const restaurantId = props.restaurantId;

  useEffect(() => {
    const inCart = cart.find((item) => item.id === id);

    if (inCart) {
      setExists(true);
    } else {
      setExists(false);
    }
  }, [cart, id]);


  return (
    <div className="border-2 border-green-800 rounded-md m-2 p-2">
      Item: {props.name}
      <br></br>
      Price: ${priceDollars}
      <br></br>
      <button onClick={() => { setItemQuantity(itemQuantity - 1) }} className="border-2 border-slate-600 w-7 m-1 rounded-full">-</button>
      {itemQuantity}
      <button onClick={() => { setItemQuantity(itemQuantity + 1) }} className="border-2 border-slate-600 w-7 m-1 rounded-full">+</button>
      <br></br>
      {
        exists
          ? <button onClick={() => {
            removeFromCart(id)

          }} className="border-2 border-green-800 rounded-md p-1">Remove from Cart</button>
          : <button onClick={() => {

            addToCart({ id, name, price, itemQuantity, restaurantId })
           
          }} className="border-2 border-green-800 rounded-md p-1">Add to Cart</button>
      }
    </div>
  )
}
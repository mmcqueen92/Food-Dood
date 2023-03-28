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
  const estTime = props.estTime;

  useEffect(() => {
    const inCart = cart.find((item) => item.id === id);

    if (inCart) {
      setExists(true);
    } else {
      setExists(false);
    }
  }, [cart, id]);


  return (
    <div className="border-2 border-blue-700 bg-green-200 rounded-md m-2 p-2 flex flex-row justify-between">
      <div className="flex flex-col justify-between">
        <div>
          Item: {props.name}
        </div>
        <div>
          Price: ${priceDollars}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div>
          <button onClick={() => { setItemQuantity(itemQuantity - 1) }} className="border-2 border-blue-700 bg-slate-200 w-7 m-1 rounded-full hover:bg-blue-700 hover:text-slate-200">-</button>
          {itemQuantity}
          <button onClick={() => { setItemQuantity(itemQuantity + 1) }} className="border-2 border-blue-700 bg-slate-200 w-7 m-1 rounded-full hover:bg-blue-700 hover:text-slate-200">+</button>
        </div>
        <br></br>
        {
          exists
            ? <button onClick={() => {
              removeFromCart(id)

            }} className="border-2 border-blue-700 rounded-md p-1 bg-slate-200 hover:bg-blue-700 hover:text-slate-200">Remove from Cart</button>
            : <button onClick={() => {

              addToCart({ id, name, price, itemQuantity, restaurantId, estTime })

            }} className="border-2 border-blue-700 rounded-md p-1 bg-slate-200 hover:bg-blue-700 hover:text-slate-200">Add to Cart</button>
        }

      </div>
    </div>
  )
}
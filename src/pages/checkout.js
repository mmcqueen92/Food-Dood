import { CartContext } from "../context/cartContext";
import { useState, useContext, useEffect } from "react";
import StripePayment from "@/components/stripe-payment";
import CheckoutCart from "@/components/checkout-cart";
import { useSession, getSession, signIn, signOut } from "next-auth/react"
import { AddressContext } from "@/context/addressContext";






export default function Checkout() {

  const { data: session } = useSession();
  const user = session.user || null;


  const { cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext)
  const { address, setAddress } = useContext(AddressContext)


  const [totalItemPrice, setTotalItemPrice] = useState(0);
  const [gst, setGst] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(300)

  useEffect(() => {
    let subTotalCounter = 0;
    for (const item of cart) {
      subTotalCounter += item.price * item.itemQuantity;
    };
    setTotalItemPrice(subTotalCounter)
  }, [cart])

  useEffect(() => {
    const newGst = Math.trunc(totalItemPrice * 0.05);
    
    setGst(newGst);

  }, [totalItemPrice])


  const totalPrice = totalItemPrice + deliveryFee + gst;

  const totalPriceDollars = totalPrice / 100;

  const customerGst = parseInt((gst / 100).toFixed(2));

  const stripeGst = customerGst * 100;

  const gstItem = {
    name: "gst",
    price: stripeGst,
    itemQuantity: 1,
  };

  const deliveryFeeItem = {
    name: "deliveryFee",
    price: deliveryFee,
    itemQuantity: 1,
  }

  const finalCart = [...cart, gstItem, deliveryFeeItem]



  return (
    <div
      className="flex flex-col items-center justify-center m-5"
    >
      <div
      className="bg-green-500 m-2 p-2 rounded-md"
      >
        <div
          className="bg-slate-200 rounded-md border-2 border-blue-800 m-2"
        >
          <label
            htmlFor="address"
            className="m-1"
          >Address:</label>
          <input
            type="text"
            placeholder="Enter an Address"
            value={address}
            onChange={(event) =>
              setAddress(
                event.target.value,
              )
            }
            className="rounded-md m-1 p-1 border-2"
            id="address"
          ></input>
        </div>
        <CheckoutCart
          items={cart}
          totalItemPrice={totalItemPrice}
          deliveryFee={deliveryFee}
          customerGst={customerGst}
          totalPriceDollars={totalPriceDollars}
        ></CheckoutCart>
        <StripePayment
          user={user}
          cart={cart}
          gst={gstItem}
          deliveryFee={deliveryFeeItem}
          address={address}
        ></StripePayment>

      </div>
    </div>
  )
}
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useSession, signIn, signOut } from "next-auth/react"
// import {prisma} from '../../server/db/client';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function StripePayment(props) {
  const { data: session } = useSession()


  const cart = props.cart;
  const gst = props.gst;
  const deliveryFee = props.deliveryFee;
  const finalCart = [...cart, gst, deliveryFee];
  const email = session.user.email;
  const userId = session.user.id;
  const restaurantId = cart[0].restaurantId
  const address = props.address;
  let id;

  console.log("cart: ", cart)

  let estTimes = cart.map((item) => {
    const estTime = item.estTime;
    console.log("estTime: ", estTime)
    return estTime;
  });
  let prepTime = 0;
  estTimes.forEach(time => {
    console.log("time: ", time)
    prepTime += time;
  })

  const deliveryTime = 15;

  console.log("prepTime: ", prepTime)



  const handleCheckout = async () => {
    if (session) {
      
      const data = {
        cart,
        gst,
        deliveryFee,
        email,
        userId,
        restaurantId,
        prepTime,
        deliveryTime,
        address
      }

      const endpoint = "/api/orders/new";

      // axios post to make new order
      await axios.post(endpoint, data)
        .then((res) => {

          id = res.data.id;

          const newEndpoint = "api/order-items/new";
          const newData = { cart, id };
          // axios post to make new order-items
          axios.post(newEndpoint, newData)
        })



      try {

        // Add order to db
        // const data = {

        // }

        // const endpoint = "";

        // await axios.post(endpoint, data)

        // Stripe payment
        // ---------------------------------------------------------- UNCOMMENT BELOW-----------------------------------------------------------------
        const stripe = await stripePromise;

        const data = { finalCart, id };

        const checkoutSession = await axios.post("/api/checkout-session",
          data,
        );

        const result = await stripe.redirectToCheckout({
          sessionId: checkoutSession.data.id,
        });

        if (result.error) {
          alert(result.error.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      signIn()
    }

  };
  return (
    <div>
      <button onClick={handleCheckout}>
        Pay
      </button>
    </div>
  );
}
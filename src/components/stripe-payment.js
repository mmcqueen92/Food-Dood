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

  let id;


  const handleCheckout = async () => {
    if (session) {

      const data = {
        cart,
        gst,
        deliveryFee,
        email,
        userId,
        restaurantId
      }

      const endpoint = "/api/orders/new";

      await axios.post(endpoint, data)
        .then((res) => {

          id = res.data.id;

          const newEndpoint = "api/order-items/new";
          const newData = { cart, id };
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
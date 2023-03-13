
export default function StripePayment(props) {
  const { data: session } = useSession()


  const cart = props.cart;
  const gst = props.gst;
  const deliveryFee = props.deliveryFee;
  const finalCart = [...cart, gst, deliveryFee];
  const email = session.user.email;
  const userId = session.user.id;

  const restaurantId = cart[0].restaurantId



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

        const id = res.data.id;
        const newEndpoint = "api/order-items/new";
        const newData = {cart, id};
        axios.post(newEndpoint, newData)
      })


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




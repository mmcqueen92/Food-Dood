const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // if (req.method === 'POST') {
    const {finalCart, id} = req.body;


    const redirectURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://food-dood';

    const transformedCart = finalCart.map((item) => {
      const transformedItem = {
        price_data: {
          currency: 'cad',
          product_data: {

            name: item.name,
          },
          unit_amount: item.price,
        },

        quantity: item.itemQuantity,
      }
      return transformedItem;
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: transformedCart,
      mode: 'payment',
      success_url: redirectURL + `/success?${id}`,
      cancel_url: redirectURL + '?status=cancel',
    
    });

    res.json({ id: session.id });



    //   try {
    //     const session = await stripe.checkout.sessions.create({
    //       payment_method_types: ['card'],
    //       line_items: 
    //       transformedCart
    //       ,
    //       mode: 'payment',
    //       success_url: `${req.headers.origin}/success`,
    //       cancel_url: `${req.headers.origin}/cancele`,
    //     });

    //     res.redirect(303, session.url);
    //   } catch (err) {
    //     res.status(err.statusCode || 500).json(err.message);
    //   }
    // } else {
    //   res.setHeader('Allow', 'POST');
    //   res.status(405).end('Method Not Allowed');
    // }
  }
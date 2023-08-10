import Stripe from "stripe";
import { buffer } from "micro";
import { prisma } from "@prisma/client";


export const config = {
  api: {
    bodyParser: false,
  },
};



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});
const endpoint_secret = "whsec_44c9aefe58dde841329c86d6dd1da93eec9416bff76034ff7738b0b248943d74";

export default async function handler(req, res) {
  console.log("req.data????", req.data)

  if (req.method === "POST") {
    console.log("webhook handler post!")
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];


    let event = req.body

    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpoint_secret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    res.json({ received: true });

    if (event.type === "charge.succeeded") {
      const charge = event.data.object;
      console.log("charge succeeded!")

      // Handle successful charge
    } else if (event.type === "invoice.payment_succeeded") {
      console.log("neato")
    } else if (event.type === "payment_intent.created") {
      console.log("put shit here!")
      // const order = await prisma.order.create({

      // })
      console.log("event: ", event)

    }
    
    else {
      console.warn(`Unhandled event type: ${event.type}`);
    }

  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }

  
};
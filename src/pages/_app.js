import '@/styles/globals.css'
import Navbar from '@/components/navbar'
import { SessionProvider } from "next-auth/react"
import { CartProvider } from "../context/cartContext";
import { AddressProvider } from "../context/addressContext";

export default function App({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <AddressProvider>
          <Navbar></Navbar>
          <Component {...pageProps} />
        </AddressProvider>
      </CartProvider>
    </SessionProvider>
  )
}

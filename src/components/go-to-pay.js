import Link from 'next/link';

export default function GoToPay () {
  return (
    <Link href="/checkout">
      <button
      className='border-2 border-green-500 p-1 rounded-md'
      >Proceed to Payment</button>
    </Link>
  )
}
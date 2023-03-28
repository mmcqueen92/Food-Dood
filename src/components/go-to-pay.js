import Link from 'next/link';

export default function GoToPay () {
  return (
    <Link href="/checkout">
      <button
      className='border-2 border-blue-800 p-1 rounded-md hover:bg-blue-700 hover:text-slate-200'
      >Proceed to Payment</button>
    </Link>
  )
}
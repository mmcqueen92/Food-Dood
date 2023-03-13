import { useState } from 'react'
import Link from 'next/link';

export default function GetLocation() {
  const [location, setLocation] = useState();

  return (
    <div className="text-3xl font-bold underline border-dashed border-2 border-red-600 m-5 flex flex-col items-center">
      <Link href="/nearby-restaurants">
      <button className="border-solid border-2 border-green-800 rounded-md p-2 m-2">
        Get Started
      </button>

      </Link>
    </div>
  )

}
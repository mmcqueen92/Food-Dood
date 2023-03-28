import Link from 'next/link';

export default function GetStarted() {
  return (
    <div className="text-3xl font-bold underline border-dashed m-5 flex flex-col items-center">
      <Link href="/nearby-restaurants">
      <button className="border-solid border-2 border-blue-800 rounded-md p-2 m-2 bg-slate-200 text-blue-700 hover:bg-blue-700 hover:text-slate-200">
        Get Started
      </button>

      </Link>
    </div>
  )

}
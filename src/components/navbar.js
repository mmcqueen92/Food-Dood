import LoginButton from "./login-button"
import Link from 'next/link';

export default function Navbar() {
  return (

    <nav className="bg-green-500 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/007/714/606/small_2x/burger-logo-template-in-line-style-burger-simple-icon-free-vector.jpg" className="h-12 mr-3 rounded-3xl" alt="Food Dood Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Food Dood</span>
        </a>
       
        <div className="flex flex-row">
          <Link href={{
            pathname: '/profile'
          }}></Link>
          <LoginButton></LoginButton>
         
        </div>

      </div>
    </nav>

  )
}

{/* <div className="w-full bg-green-800">NAVBAR</div> */ }
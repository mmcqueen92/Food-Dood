import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';

export default function LoginButton(props) {

  const { data: session } = useSession()
  if (session) {

    return (
      <div className="flex flex-row">
        <div className="m-2 text-blue-800 p-2">
          Signed in as {session.user.email}
        </div>
        <button className="m-2 border-blue-700 border-2 bg-slate-200 text-blue-800 rounded-md p-1 hover:bg-blue-700 hover:text-slate-200">
          <Link href={{
            pathname: '/profile'
          }}>Profile</Link>
        </button>
        <button onClick={() => signOut()} className="m-2 border-blue-700 border-2 bg-slate-200 text-blue-800 rounded-md p-1 hover:bg-blue-700 hover:text-slate-200">Sign out</button>
      </div>
    )
  }


  return (
    <div className="p-1 flex flex-row">
      <div className="m-2 text-blue-700 p-2">
      Not signed in
      </div>
      <button className="border-2 border-blue-800 rounded-md p-1 m-2 bg-slate-200 text-blue-800 hover:bg-blue-700 hover:text-slate-200" onClick={() => signIn()}>Sign in</button>
    </div>
  )
}
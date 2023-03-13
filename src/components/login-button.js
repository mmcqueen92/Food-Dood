import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';

export default function LoginButton(props) {

  const { data: session } = useSession()
  if (session) {

    return (
      <div className="flex flex-row">
        <div className="m-2">
          Signed in as {session.user.email}
        </div>
        <button className="m-2 border-blue-700 border-2 rounded-md p-1">
          <Link href={{
            pathname: '/profile'
          }}>Profile</Link>
        </button>
        <button onClick={() => signOut()} className="m-2 border-blue-700 border-2 rounded-md p-1">Sign out</button>
      </div>
    )
  }


  return (
    <div className="p-1">
      <p className="m-2">
      Not signed in
      </p>
      <button className="border-2 border-red-700 rounded-md p-1 m-2" onClick={() => signIn()}>Sign in</button>
    </div>
  )
}
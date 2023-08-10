import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import {prisma} from "../../../../server/db/client"


export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({token, user, account, profile, isNewUser}) {
        user && (token.user = user)
        return token
    },
    async session({session, token, user}) {
        session = {
            ...session,
            user: {
                id: user.id,
                ...session.user
            }
        }
        return session
    }
},
authOptions: {}
})
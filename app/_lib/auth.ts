import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from './prisma'

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
})

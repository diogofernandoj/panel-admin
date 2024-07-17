import { getServerSession } from 'next-auth'
import { authOptions } from '../_lib/auth'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

export default async function PublicLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (session?.user) {
    redirect('/dashboard')
  }

  return <>{children}</>
}

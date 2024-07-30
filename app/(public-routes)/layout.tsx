import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import { auth } from '../_lib/auth'

export default async function PublicLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await auth()
  if (session?.user) {
    redirect('/dashboard')
  }

  return <>{children}</>
}

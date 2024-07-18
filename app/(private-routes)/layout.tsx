import { getServerSession } from 'next-auth'
import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { authOptions } from '../_lib/auth'
import Navbar from '../_components/navbar'

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/')
  }

  return (
    <div className="flex">
      <Navbar />
      {children}
    </div>
  )
}

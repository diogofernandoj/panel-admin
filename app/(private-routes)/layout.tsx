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
    <div>
      <div className="fixed">
        <Navbar />
      </div>
      <div className="pl-[350px]">{children}</div>
    </div>
  )
}

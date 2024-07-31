import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { auth } from '../_lib/auth'
import Navbar from '../_components/navbar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Gerencie suas finanças e acesse relatórios',
}

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect('/')
  }

  return (
    <div>
      <Navbar />
      <div className="pb-[100px] md:pb-0 md:pl-[300px]">{children}</div>
    </div>
  )
}

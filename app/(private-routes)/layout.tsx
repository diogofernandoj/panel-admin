import { getServerSession } from 'next-auth'
import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { authOptions } from '../_lib/auth'
import Navbar from '../_components/navbar'
import { Metadata } from 'next'
import DashboardHeader from './_components/dashboard-header'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Gerencie suas finanças e acesse relatórios',
}

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
      <div className="pl-[350px]">
        <div className="pt-4 px-6">
          <DashboardHeader />
        </div>
        {children}
      </div>
    </div>
  )
}

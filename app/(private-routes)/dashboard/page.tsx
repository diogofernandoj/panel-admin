import React from 'react'
import { db } from '@/app/_lib/prisma'
import { auth } from '@/app/_lib/auth'
import DashboardContent from './_components/dashboard-content'
import DashboardHeader from '../_components/dashboard-header'

const DashboardPage = async () => {
  const session = await auth()
  const transactions = await db.transaction.findMany({
    where: {
      userId: session?.user?.id,
    },
  })

  return (
    <div className="flex flex-col w-full p-6 gap-6 min-h-screen">
      <DashboardHeader title="Dashboard" />
      <DashboardContent transactions={transactions} />
    </div>
  )
}

export default DashboardPage

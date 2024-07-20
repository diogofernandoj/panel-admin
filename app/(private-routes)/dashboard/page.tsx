import React from 'react'
import Cards from './_components/cards'
import TransactionHistory from './_components/transaction-history'
import TransactionLineChart from './_components/transaction-line-chart'
import TransactionPieChart from './_components/transaction-pie-chart'
import DashboardHeader from './_components/dashboard-header'
import TransactionBarChart from './_components/transaction-bar-chart'
import { db } from '@/app/_lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/_lib/auth'

const Dashboard = async () => {
  const session = await getServerSession(authOptions)
  const transactions = await db.transaction.findMany({
    where: {
      userId: session?.user.id,
    },
  })

  return (
    <div className="flex flex-col w-full p-6 gap-6">
      <DashboardHeader />
      <Cards transactions={transactions} />
      <div className="flex gap-6">
        <div className="flex flex-col gap-6 w-full">
          <TransactionBarChart transactions={transactions} />
          <TransactionHistory />
        </div>
        <div className="flex flex-col gap-6">
          <TransactionPieChart />
          <TransactionLineChart />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

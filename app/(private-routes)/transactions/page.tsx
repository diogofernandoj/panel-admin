import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/_lib/auth'
import { db } from '@/app/_lib/prisma'
import DashboardHeader from '../_components/dashboard-header'

const TransactionsPage = async () => {
  const session = await getServerSession(authOptions)
  const transactions = await db.transaction.findMany({
    where: {
      userId: session?.user.id,
    },
  })

  const sortedTransactions = transactions.sort(
    (a, b) => Number(b.date) - Number(a.date)
  )

  return (
    <div className="min-h-screen p-6 flex flex-col gap-6">
      <DashboardHeader title="Transações" />
      <DataTable columns={columns} data={sortedTransactions} />
    </div>
  )
}

export default TransactionsPage

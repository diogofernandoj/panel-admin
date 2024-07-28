import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/_lib/auth'
import { db } from '@/app/_lib/prisma'

const TransactionsPage = async () => {
  const session = await getServerSession(authOptions)
  const transactions = await db.transaction.findMany({
    where: {
      userId: session?.user.id,
    },
  })

  return (
    <div className="min-h-screen p-6">
      <DataTable columns={columns} data={transactions} />
    </div>
  )
}

export default TransactionsPage

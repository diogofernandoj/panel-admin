import React from 'react'
import { auth } from '@/app/_lib/auth'
import { db } from '@/app/_lib/prisma'
import TransactionsContent from './_components/transactions-content'

const TransactionsPage = async () => {
  const session = await auth()
  const transactions = await db.transaction.findMany({
    where: {
      userId: session?.user?.id,
    },
  })

  return (
    <div className="min-h-screen p-6 flex flex-col gap-6">
      <TransactionsContent transactions={transactions} />
    </div>
  )
}

export default TransactionsPage

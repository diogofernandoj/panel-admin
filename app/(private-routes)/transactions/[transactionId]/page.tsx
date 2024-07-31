import { db } from '@/app/_lib/prisma'
import React from 'react'
import TransactionForm from '../../_components/transaction-form'
import { ArrowLeftCircleIcon } from 'lucide-react'
import Link from 'next/link'

const TransactionDetailsPage = async ({
  params,
}: {
  params: { transactionId: string }
}) => {
  const transaction = await db.transaction.findUnique({
    where: {
      id: params.transactionId,
    },
  })

  if (!transaction) return null

  return (
    <div className="p-4 lg:p-6 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Link href="/transactions">
            <ArrowLeftCircleIcon size={30} />
          </Link>
          <h2 className="text-lg font-bold">Detalhes da transação</h2>
        </div>
      </div>
      <div className="w-full max-w-[800px]">
        <TransactionForm transaction={transaction} />
      </div>
    </div>
  )
}

export default TransactionDetailsPage

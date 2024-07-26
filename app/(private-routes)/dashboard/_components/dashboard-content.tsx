'use client'

import React, { useEffect, useState } from 'react'

import Cards from './cards'
import TransactionBarChart from './transaction-bar-chart'
import { Transaction } from '@prisma/client'
import { getFilteredTransactions, Period } from '@/app/_lib/utils'
import TransactionHistory from './transaction-history'

const DashboardContent = ({
  transactions,
}: {
  transactions: Transaction[]
}) => {
  const [period, setPeriod] = useState<Period>('weekly')
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[] | null
  >(null)

  useEffect(() => {
    const filterTransactions = () => {
      setFilteredTransactions(getFilteredTransactions(transactions, period))
    }
    filterTransactions()
  }, [transactions, period])

  if (!filteredTransactions) return null

  return (
    <div className="flex flex-col gap-6">
      <Cards transactions={filteredTransactions} />
      <div className="flex gap-6">
        <div className="flex flex-col gap-6 w-full">
          <TransactionBarChart
            transactions={filteredTransactions}
            period={period}
            setPeriod={setPeriod}
          />
          <TransactionHistory transactions={filteredTransactions} />
        </div>
        <div className="flex flex-col gap-6 w-1/3"></div>
      </div>
    </div>
  )
}

export default DashboardContent

'use client'

import React, { useEffect, useState } from 'react'

import Cards from './cards'
import TransactionBarChart from './transaction-bar-chart'
import { Transaction } from '@prisma/client'
import { getFilteredTransactions, Period } from '@/app/_lib/utils'
import TransactionHistory from './transaction-history'
import TransactionRadialChart from './transaction-radial-chart'
import TransactionAreaChart from './transaction-area-chart'

const DashboardContent = ({
  transactions,
}: {
  transactions: Transaction[]
}) => {
  const [period, setPeriod] = useState<Period>('weekly')
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([])

  useEffect(() => {
    const filterTransactions = () => {
      setFilteredTransactions(getFilteredTransactions(transactions, period))
    }
    filterTransactions()
  }, [transactions, period])

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
        <div className="flex flex-col gap-6 w-1/3">
          <TransactionRadialChart
            totalTransactions={filteredTransactions.length}
          />
          <TransactionAreaChart
            transactions={filteredTransactions}
            period={period}
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardContent

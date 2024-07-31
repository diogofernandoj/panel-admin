'use client'

import React, { useEffect, useState } from 'react'

import Cards from './cards'
import TransactionBarChart from './transaction-bar-chart'
import { Transaction } from '@prisma/client'
import { getFilteredTransactions, Period } from '@/app/_lib/utils'
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
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex flex-col gap-6 flex-1">
        <Cards transactions={filteredTransactions} />
        <TransactionBarChart
          transactions={filteredTransactions}
          period={period}
          setPeriod={setPeriod}
        />
      </div>
      <div className="flex flex-col gap-6 w-full lg:w-[240px]">
        <TransactionRadialChart
          totalTransactions={filteredTransactions.length}
        />
        <TransactionAreaChart
          transactions={filteredTransactions}
          period={period}
        />
      </div>
    </div>
  )
}

export default DashboardContent

'use client'

import React, { useEffect, useState } from 'react'
import { Transaction } from '@prisma/client'
import DashboardHeader from '../../_components/dashboard-header'
import { columns } from './columns'
import { DataTable } from './data-table'
import DateRangePicker from './date-range-picker'
import { DateRange } from 'react-day-picker'

const TransactionsContent = ({
  transactions,
}: {
  transactions: Transaction[]
}) => {
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([])
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1).setUTCHours(
        3,
        0,
        0,
        0
      )
    ),
    to: new Date(new Date().setUTCHours(3, 0, 0, 0)),
  })

  const filterTransactionsByDateRange = () => {
    const startDate = date?.from
      ? new Date(new Date(date?.from).setUTCHours(3, 0, 0, 0))
      : null
    const endDate = date?.to
      ? new Date(new Date(date?.to).setUTCHours(3, 0, 0, 0))
      : null

    return transactions.filter((transaction) => {
      const transactionDate = new Date(
        new Date(transaction.date).setUTCHours(3, 0, 0, 0)
      )

      if (startDate && endDate) {
        return transactionDate >= startDate && transactionDate <= endDate
      } else if (startDate) {
        return transactionDate >= startDate
      } else {
        return true
      }
    })
  }

  useEffect(() => {
    const filterTransactions = () => {
      const newTransactions = filterTransactionsByDateRange()
      const sortedTransactions = newTransactions.sort(
        (a, b) => Number(b.date) - Number(a.date)
      )
      setFilteredTransactions(sortedTransactions)
    }
    filterTransactions()
  }, [transactions, date])

  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader title="Transações" />
      <div className="absolute right-6 top-24 z-10">
        <DateRangePicker date={date} setDate={setDate} />
      </div>
      <DataTable columns={columns} data={filteredTransactions} />
    </div>
  )
}

export default TransactionsContent

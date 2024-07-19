import React from 'react'
import Cards from './_components/cards'
import TransactionHistory from './_components/transaction-history'
import TransactionLineChart from './_components/transaction-line-chart'
import TransactionBarChart from './_components/transaction-bar-chart'
import TransactionPieChart from './_components/transaction-pie-chart'
import DashboardHeader from './_components/dashboard-header'

const Dashboard = async () => {
  return (
    <div className="flex flex-col w-full p-6 gap-6">
      <DashboardHeader />
      <Cards />
      <div className="flex gap-6">
        <div className="flex flex-col gap-6 w-full">
          <TransactionBarChart />
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

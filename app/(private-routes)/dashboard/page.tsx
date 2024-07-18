import React from 'react'
import DashboardHeader from './_components/dashboard-header'
import Cards from './_components/cards'
import TransactionReports from './_components/transaction-reports'
import TransactionChart from './_components/transaction-chart'

const Dashboard = async () => {
  return (
    <div className="flex flex-col w-full p-8">
      <DashboardHeader />
      <div className="mt-8">
        <Cards />
      </div>
      <div className="flex mt-8 items-start gap-8">
        <TransactionChart />
        <TransactionReports />
      </div>
    </div>
  )
}

export default Dashboard

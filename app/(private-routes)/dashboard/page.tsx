import React from 'react'
import DashboardHeader from './_components/dashboard-header'
import Cards from './_components/cards'
import TransactionReports from './_components/transaction-reports'

const Dashboard = async () => {
  return (
    <div className="flex flex-col w-full p-8">
      <DashboardHeader />
      <div className="flex mt-8 items-start gap-8">
        <Cards />
        <TransactionReports />
      </div>
    </div>
  )
}

export default Dashboard

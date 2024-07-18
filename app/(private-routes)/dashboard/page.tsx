import React from 'react'
import DashboardHeader from './_components/dashboard-header'
import Cards from './_components/cards'

const Dashboard = async () => {
  return (
    <div className="flex flex-col w-full p-8">
      <DashboardHeader />
      <div className="flex mt-8">
        <Cards />
      </div>
    </div>
  )
}

export default Dashboard

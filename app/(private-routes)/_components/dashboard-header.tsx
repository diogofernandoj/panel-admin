'use client'

import React from 'react'
import AddTransaction from './add-transaction'
import UserBadge from './user-badge'

const DashboardHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="font-bold text-2xl">{title}</h2>
      <div className="flex items-center gap-2">
        <AddTransaction />
        <UserBadge />
      </div>
    </div>
  )
}

export default DashboardHeader

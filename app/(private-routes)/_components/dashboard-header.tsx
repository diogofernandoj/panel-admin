'use client'

import { Avatar, AvatarImage } from '@/app/_components/ui/avatar'
import { Card } from '@/app/_components/ui/card'
import React from 'react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import AddTransaction from './add-transaction'

const DashboardHeader = () => {
  const { data } = useSession()
  const pathname = usePathname()

  const getHeaderTitle = () => {
    if (pathname === '/dashboard') {
      return 'Dashboard'
    }

    if (pathname === '/transactions') {
      return 'Transações'
    }
  }

  return (
    <div className="flex justify-between items-center">
      <h2 className="font-bold text-2xl">{getHeaderTitle()}</h2>
      <div className="flex items-center gap-2">
        <AddTransaction />
        <Card className="flex items-center py-2 px-4 rounded-lg w-max gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={data?.user?.image ?? ''} />
          </Avatar>
          <span className="font-bold">{data?.user?.name}</span>
        </Card>
      </div>
    </div>
  )
}

export default DashboardHeader

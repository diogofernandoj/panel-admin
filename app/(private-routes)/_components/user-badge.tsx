'use client'

import React from 'react'
import { Avatar, AvatarImage } from '@/app/_components/ui/avatar'
import { Card } from '@/app/_components/ui/card'
import { useSession } from 'next-auth/react'

const UserBadge = () => {
  const { data } = useSession()
  return (
    <Card className="flex flex-col md:flex-row items-center py-2 px-4 rounded-lg w-max gap-2">
      <Avatar className="h-6 w-6">
        <AvatarImage src={data?.user?.image ?? ''} />
      </Avatar>
      <span className="text-[10px] font-bold">
        {data?.user?.name?.split(' ')[0]}
      </span>
    </Card>
  )
}

export default UserBadge

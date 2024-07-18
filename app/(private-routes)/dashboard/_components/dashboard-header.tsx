import { Avatar, AvatarImage } from '@/app/_components/ui/avatar'
import { Button } from '@/app/_components/ui/button'
import { Card } from '@/app/_components/ui/card'
import { Input } from '@/app/_components/ui/input'
import { authOptions } from '@/app/_lib/auth'
import { SearchIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'
import React from 'react'

const DashboardHeader = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex justify-between items-center">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <div className="flex relative">
        <Input className="py-2 px-4 w-64" placeholder="Pesquisar..." />
        <Button variant="secondary" className="absolute right-0 top-0">
          <SearchIcon size={18} />
        </Button>
      </div>
      <Card className="flex items-center py-2 px-4 rounded-lg w-max gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage src={session?.user?.image ?? ''} />
        </Avatar>
        <span className="font-bold">{session?.user?.name}</span>
      </Card>
    </div>
  )
}

export default DashboardHeader

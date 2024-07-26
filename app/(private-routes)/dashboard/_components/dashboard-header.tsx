import { Avatar, AvatarImage } from '@/app/_components/ui/avatar'
import { Button } from '@/app/_components/ui/button'
import { Card } from '@/app/_components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/app/_components/ui/dialog'
import { authOptions } from '@/app/_lib/auth'
import { CirclePlusIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'
import React from 'react'
import AddTransaction from './add-transaction'

const DashboardHeader = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex justify-between items-center">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <div className="flex items-center">
        <Dialog>
          <Button
            asChild
            variant="ghost"
            className="text-sm flex items-center gap-1"
          >
            <DialogTrigger>
              Nova transação <CirclePlusIcon size={18} />
            </DialogTrigger>
          </Button>
          <DialogContent>
            <AddTransaction />
          </DialogContent>
        </Dialog>
        <Card className="flex items-center py-2 px-4 rounded-lg w-max gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={session?.user?.image ?? ''} />
          </Avatar>
          <span className="font-bold">{session?.user?.name}</span>
        </Card>
      </div>
    </div>
  )
}

export default DashboardHeader

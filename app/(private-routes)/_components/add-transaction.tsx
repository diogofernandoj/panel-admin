'use client'

import React, { useState } from 'react'
import { Button } from '@/app/_components/ui/button'
import { CirclePlusIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog'
import TransactionForm from './transaction-form'

const AddTransaction = () => {
  const [open, setIsOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <Button
        asChild
        variant="ghost"
        className="text-sm flex items-center gap-1"
      >
        <DialogTrigger className="font-semibold text-sm">
          Nova transação <CirclePlusIcon size={18} />
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogTitle className="mb-4">Nova transação</DialogTitle>
        <TransactionForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}

export default AddTransaction

'use client'

import React from 'react'
import { Trash2Icon } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/app/_components/ui/alert-dialog'
import { deleteTransaction } from '@/app/_actions/delete-transaction'
import { useToast } from '@/app/_components/ui/use-toast'

const DeleteTransactionButton = ({
  transactionId,
}: {
  transactionId: string
}) => {
  const { toast } = useToast()

  const handleDeleteClick = async () => {
    await deleteTransaction(transactionId)
    toast({
      title: 'Transação deletada com sucesso!',
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2Icon
          size={16}
          className="text-gray-300 hover:text-red-500 transition"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso irá remover permanentemente
            essa transação.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteClick}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTransactionButton

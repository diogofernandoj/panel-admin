'use client'

import React from 'react'
import { Transaction } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  Settings2Icon,
} from 'lucide-react'
import { format } from 'date-fns'
import { makeCurrencyNumber } from '@/app/_lib/utils'
import Link from 'next/link'
import DeleteTransactionButton from './delete-transaction-button'

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'type',
    header: '',
    cell: ({ row }) => {
      const icon = row.original.type ? (
        <ArrowUpCircleIcon size={14} className="text-green-400" />
      ) : (
        <ArrowDownCircleIcon size={14} className="text-red-400" />
      )

      return icon
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row }) => {
      return <span>{format(row.original.date, 'dd-MM-yyyy')}</span>
    },
  },
  {
    accessorKey: 'title',
    header: 'Título',
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row }) => {
      return makeCurrencyNumber(Number(row.original.amount))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Link href={`/transactions/${row.original.id}`}>
            <Settings2Icon
              size={16}
              className="text-gray-300 hover:text-blue-500 transition"
            />
          </Link>
          <DeleteTransactionButton transactionId={row.original.id} />
        </div>
      )
    },
  },
]

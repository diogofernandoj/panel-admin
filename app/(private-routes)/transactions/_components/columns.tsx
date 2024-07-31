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
    header: () => {
      return <span className="text-xs lg:text-sm">Data</span>
    },
    cell: ({ row }) => {
      const date = new Date(new Date(row.original.date).setUTCHours(3, 0, 0, 0))
      return (
        <span className="text-[10px] lg:text-sm">
          {format(date, 'dd-MM-yyyy')}
        </span>
      )
    },
  },
  {
    accessorKey: 'title',
    header: () => {
      return <span className="text-xs lg:text-sm">Título</span>
    },
    cell: ({ row }) => {
      return (
        <span className="text-[10px] lg:text-sm">{row.original.title}</span>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: () => {
      return <span className="text-xs lg:text-sm">Valor</span>
    },
    cell: ({ row }) => {
      return (
        <span className="text-[10px] lg:text-sm">
          {makeCurrencyNumber(Number(row.original.amount))}
        </span>
      )
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

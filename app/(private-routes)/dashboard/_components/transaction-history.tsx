import React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/_components/ui/table'
import { Transaction } from '@prisma/client'
import { CircleArrowDownIcon, CircleArrowUpIcon } from 'lucide-react'
import { format } from 'date-fns'
import { makeCurrencyNumber } from '@/app/_lib/utils'
import { Card } from '@/app/_components/ui/card'

const TransactionHistory = ({
  transactions,
}: {
  transactions: Transaction[]
}) => {
  const data = transactions.sort((a, b) => Number(b.date) - Number(a.date))
  const totalAmount = transactions.reduce(
    (acc, curr) =>
      curr.type ? Number(curr.amount) + acc : acc - Number(curr.amount),
    0
  )

  return (
    <Card>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Título</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.type ? (
                  <CircleArrowUpIcon className="text-green-400" size={18} />
                ) : (
                  <CircleArrowDownIcon className="text-red-400" size={18} />
                )}
              </TableCell>
              <TableCell className="font-medium">
                {format(
                  new Date(new Date(item.date).setUTCHours(3)),
                  'dd-MM-yyyy'
                )}
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell
                className={`text-right ${item.type ? 'text-green-400' : 'text-red-400'}`}
              >{`${item.type ? '+' : '-'}${makeCurrencyNumber(Number(item.amount))}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              <span className="bg-blue-500 bg-opacity-10 w-max py-2 px-4 rounded-full text-blue-500">
                {makeCurrencyNumber(totalAmount)}
              </span>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  )
}

export default TransactionHistory

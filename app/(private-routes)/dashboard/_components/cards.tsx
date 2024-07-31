import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'
import { DollarSignIcon, ScaleIcon } from 'lucide-react'
import React from 'react'
import CardChart from './radial-progress'
import { Transaction } from '@prisma/client'
import { makeCurrencyNumber } from '@/app/_lib/utils'

const Cards = ({ transactions }: { transactions: Transaction[] }) => {
  const totalEarnings = transactions
    .filter((transaction) => transaction.type)
    .reduce((acc, curr) => acc + Number(curr.amount), 0)

  const totalExpenses = transactions
    .filter((transaction) => !transaction.type)
    .reduce((acc, curr) => acc + Number(curr.amount), 0)

  const totalBalance = totalEarnings - totalExpenses

  const earningsPercentage =
    ((totalEarnings / (totalEarnings + totalExpenses)) * 100) | 0
  const expensesPercentage =
    ((totalExpenses / (totalEarnings + totalExpenses)) * 100) | 0
  const balancePercentage =
    ((totalBalance / (totalEarnings + totalExpenses)) * 100) | 0

  return (
    <div className="flex-col md:flex-row flex items-center gap-6">
      <Card className="w-full ">
        <CardHeader className="bg-green-500 m-4 bg-opacity-10 w-max rounded-full p-2">
          <DollarSignIcon className="text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="font-bold text-sm">
                {makeCurrencyNumber(totalEarnings)}
              </span>
              <span className="text-gray-400 text-xs">Entradas</span>
            </div>
            <CardChart
              percentage={Number(earningsPercentage.toFixed(0))}
              barColor="green-500"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full ">
        <CardHeader className="bg-red-500 m-4 bg-opacity-10 w-max rounded-full p-2">
          <DollarSignIcon className="text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="font-bold text-sm">
                {makeCurrencyNumber(totalExpenses)}
              </span>
              <span className="text-gray-400 text-xs">Saídas</span>
            </div>
            <CardChart
              percentage={Number(expensesPercentage.toFixed(0))}
              barColor="red-500"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full ">
        <CardHeader className="bg-blue-500 m-4 bg-opacity-10 w-max rounded-full p-2">
          <ScaleIcon className="text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="font-bold text-sm">
                {makeCurrencyNumber(totalBalance)}
              </span>
              <span className="text-gray-400 text-xs">Balanço</span>
            </div>
            <CardChart
              percentage={Number(balancePercentage.toFixed(0))}
              barColor="blue-500"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Cards

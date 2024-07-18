'use client'

import React from 'react'

import { Pie, PieChart } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/app/_components/ui/chart'
const chartData = [
  { transaction: 'earnings', transactions: 275, fill: 'var(--color-earnings)' },
  { transaction: 'expenses', transactions: 200, fill: 'var(--color-expenses)' },
  { transaction: 'balance', transactions: 187, fill: 'var(--color-balance)' },
]

const chartConfig = {
  transactions: {
    label: 'Transactions',
  },
  earnings: {
    label: 'Entradas',
    color: '#22c55e',
  },
  expenses: {
    label: 'Saídas',
    color: '#ef4444',
  },
  balance: {
    label: 'Balanço',
    color: '#3b82f6',
  },
} satisfies ChartConfig

const TransactionReports = () => {
  return (
    <Card className="flex flex-col bg-slate-900">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-sm">Transaction Reports</CardTitle>
        <CardDescription className="text-xs">
          January - June 2024
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="transactions" />
            <ChartLegend
              content={<ChartLegendContent nameKey="transaction" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default TransactionReports

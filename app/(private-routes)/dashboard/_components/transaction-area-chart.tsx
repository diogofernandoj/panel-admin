'use client'

import React, { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { Card, CardContent } from '@/app/_components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/app/_components/ui/chart'
import { Transaction } from '@prisma/client'
import { generateDateRange, Period } from '@/app/_lib/utils'

const chartConfig = {
  transactions: {
    label: 'Transações',
  },
  entradas: {
    label: 'Entradas',
    color: '#22c55e',
  },
  saidas: {
    label: 'Saídas',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

type ChartData = {
  date: string
  entradas: number
  saidas: number
}

interface TransactionAreaChartProps {
  transactions: Transaction[]
  period: Period
}

const TransactionAreaChart = ({
  transactions,
  period,
}: TransactionAreaChartProps) => {
  const [chartData, setChartData] = useState<ChartData[]>([])

  useEffect(() => {
    const currentDate = new Date(new Date().setUTCHours(3, 0, 0, 0))
    const startDate = new Date(new Date().setUTCHours(3, 0, 0, 0))
    switch (period) {
      case 'weekly':
        startDate.setDate(currentDate.getDate() - 6)
        break
      case 'monthly':
        startDate.setDate(1)
        break
      case 'yearly':
        startDate.setFullYear(new Date().getFullYear(), 0, 1)
        break
    }

    const dateRange = generateDateRange(startDate, currentDate, period)

    const initialData: ChartData[] = dateRange.map((date) => ({
      date,
      entradas: 0,
      saidas: 0,
    }))

    const data = transactions.reduce<ChartData[]>((acc, transaction) => {
      const { date, type, amount } = transaction
      const formattedDate =
        period === 'yearly'
          ? date.toISOString().slice(0, 7)
          : date.toISOString().split('T')[0]

      let dateEntry = acc.find((entry) => entry.date === formattedDate)

      if (!dateEntry) {
        dateEntry = { date: formattedDate, entradas: 0, saidas: 0 }
        acc.push(dateEntry)
      }

      if (type) {
        dateEntry.entradas += Number(amount)
      } else if (!type) {
        dateEntry.saidas += Number(amount)
      }

      return acc
    }, initialData)

    setChartData(data)
  }, [period, transactions])

  return (
    <Card className="w-full">
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillSaidas" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-saidas)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-saidas)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillEntradas" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-entradas)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-entradas)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="entradas"
              type="natural"
              fill="url(#fillEntradas)"
              stroke="var(--color-entradas)"
              stackId="a"
            />
            <Area
              dataKey="saidas"
              type="natural"
              fill="url(#fillSaidas)"
              stroke="var(--color-saidas)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default TransactionAreaChart

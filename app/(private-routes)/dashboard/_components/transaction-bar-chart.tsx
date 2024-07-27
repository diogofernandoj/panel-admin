/* eslint-disable no-case-declarations */
'use client'

import React, { useEffect, useState } from 'react'

import { Bar, BarChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/app/_components/ui/chart'
import { Transaction } from '@prisma/client'
import { generateDateRange, Period } from '@/app/_lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const chartConfig = {
  earning: {
    label: 'Entradas',
    color: '#22c55e',
  },
  expense: {
    label: 'Saídas',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

type ChartData = {
  date: string
  entradas: number
  saidas: number
}

interface TransactionBarChartProps {
  transactions: Transaction[]
  period: Period
  setPeriod: (value: Period) => void
}

const TransactionBarChart = ({
  transactions,
  period,
  setPeriod,
}: TransactionBarChartProps) => {
  const [chartData, setChartData] = useState<ChartData[]>([])

  const getTick = () => {
    if (period === 'weekly') {
      return 'eeeeee'
    }

    if (period === 'monthly') {
      return 'd'
    }

    return 'MMM'
  }

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
    <Card className=" w-full flex-1">
      <CardHeader>
        <CardTitle className="text-base flex justify-between items-center">
          Transações
          <Select
            defaultValue="weekly"
            onValueChange={(value: Period) => setPeriod(value)}
          >
            <SelectTrigger className="w-max text-xs">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="text-xs" value="weekly">
                Semanal
              </SelectItem>
              <SelectItem className="text-xs" value="monthly">
                Mensal
              </SelectItem>
              <SelectItem className="text-xs" value="yearly">
                Anual
              </SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                return format(
                  new Date(new Date(value).setUTCHours(3)).toISOString(),
                  getTick(),
                  {
                    locale: ptBR,
                  }
                )
              }}
            />
            <Bar
              dataKey="entradas"
              stackId="a"
              fill="var(--color-earning)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="saidas"
              stackId="a"
              fill="var(--color-expense)"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  className="w-[180px]"
                  formatter={(value, name, item, index) => (
                    <>
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                        style={
                          {
                            '--color-bg': `var(--color-${name})`,
                          } as React.CSSProperties
                        }
                      />
                      {chartConfig[name as keyof typeof chartConfig]?.label ||
                        name}
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        R${value}
                      </div>
                      {index === 1 && (
                        <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                          Total
                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                            R$
                            {(
                              item.payload.entradas - item.payload.saidas
                            ).toFixed(2)}
                            <span className="font-normal text-muted-foreground"></span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                />
              }
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default TransactionBarChart

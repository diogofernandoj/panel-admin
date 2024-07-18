'use client'

import React from 'react'

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
const chartData = [
  { date: '2024-07-15', earnings: 450, expenses: 300 },
  { date: '2024-07-16', earnings: 380, expenses: 420 },
  { date: '2024-07-17', earnings: 520, expenses: 120 },
  { date: '2024-07-18', earnings: 140, expenses: 550 },
  { date: '2024-07-19', earnings: 600, expenses: 350 },
  { date: '2024-07-20', earnings: 480, expenses: 400 },
]

const chartConfig = {
  earning: {
    label: 'Entradas',
    color: 'green',
  },
  expense: {
    label: 'Saídas',
    color: '#22c55e',
  },
} satisfies ChartConfig

const TransactionChart = () => {
  return (
    <Card className="bg-slate-900 w-full flex-1">
      <CardHeader>
        <CardTitle>Transações</CardTitle>
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
                return new Date(value).toLocaleDateString('en-US', {
                  weekday: 'short',
                })
              }}
            />
            <Bar
              dataKey="earnings"
              stackId="a"
              fill="var(--color-earning)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="expenses"
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
                      {/* Add this after the last item */}
                      {index === 1 && (
                        <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                          Total
                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                            R${item.payload.earnings - item.payload.expenses}
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

export default TransactionChart

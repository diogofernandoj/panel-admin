/* eslint-disable react/prop-types */
'use client'

import React from 'react'
import { TrendingUp } from 'lucide-react'
import { CartesianGrid, Dot, Line, LineChart } from 'recharts'

import {
  Card,
  CardContent,
  CardFooter,
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
  { day: 'monday', transactions: 200, fill: 'var(--color-monday)' },
  { day: 'tuesday', transactions: 187, fill: 'var(--color-tuesday)' },
  { day: 'wednesday', transactions: 173, fill: 'var(--color-wednesday)' },
  { day: 'thursday', transactions: 250, fill: 'var(--color-thursday)' },
  { day: 'friday', transactions: 275, fill: 'var(--color-friday)' },
]

const chartConfig = {
  transactions: {
    label: 'Transações',
    color: 'hsl(var(--chart-2))',
  },
  monday: {
    label: 'Segunda-feira',
    color: 'hsl(var(--chart-1))',
  },
  tuesday: {
    label: 'Terça-feira',
    color: 'hsl(var(--chart-2))',
  },
  wednesday: {
    label: 'Quarta-feira',
    color: 'hsl(var(--chart-3))',
  },
  thursday: {
    label: 'Quinta-feira',
    color: 'hsl(var(--chart-4))',
  },
  friday: {
    label: 'Sexta-feira',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig

const TransactionLineChart = () => {
  return (
    <Card className=" flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-sm text-white">Relatório semanal</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 24,
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="transactions"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="transactions"
              type="natural"
              stroke="var(--color-transactions)"
              strokeWidth={2}
              dot={({ payload, ...props }) => {
                return (
                  <Dot
                    key={payload.day}
                    r={5}
                    cx={props.cx}
                    cy={props.cy}
                    fill={payload.fill}
                    stroke={payload.fill}
                  />
                )
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Faturamento aumentou em 5.2% essa semana{' '}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando total de transações da semana
        </div>
      </CardFooter>
    </Card>
  )
}

export default TransactionLineChart

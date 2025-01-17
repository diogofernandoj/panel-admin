/* eslint-disable no-case-declarations */
import { Transaction } from '@prisma/client'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Period = 'weekly' | 'monthly' | 'yearly'

export const makeCurrencyNumber = (number: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number)
}

export const isWithinPeriod = (
  date: Date,
  period: 'weekly' | 'monthly' | 'yearly'
): boolean => {
  const currentDate = new Date(new Date().setUTCHours(3, 0, 0, 0))
  const transactionDate = new Date(new Date(date).setUTCHours(3, 0, 0, 0))

  switch (period) {
    case 'weekly':
      const weekAgo = new Date(
        new Date(currentDate).setDate(currentDate.getDate() - 6)
      )
      return transactionDate >= weekAgo && transactionDate <= currentDate

    case 'monthly':
      const fullMonth = new Date(new Date(currentDate).setDate(1))
      return transactionDate >= fullMonth && transactionDate <= currentDate

    case 'yearly':
      const fullYear = new Date(
        new Date(currentDate).setFullYear(new Date().getFullYear(), 0, 1)
      )
      return transactionDate >= fullYear && transactionDate <= currentDate

    default:
      return false
  }
}

export const generateDateRange = (
  startDate: Date,
  endDate: Date,
  period: string
): string[] => {
  const dates: string[] = []
  const currentDate = new Date(startDate)

  if (period === 'yearly') {
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().slice(0, 7))
      currentDate.setMonth(currentDate.getMonth() + 1)
    }
  } else {
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0])
      currentDate.setDate(currentDate.getDate() + 1)
    }
  }

  return dates
}

export const getFilteredTransactions = (
  transactions: Transaction[],
  period: Period
) =>
  transactions.filter((transaction) => isWithinPeriod(transaction.date, period))

'use server'

import { getServerSession } from 'next-auth'
import { db } from '../_lib/prisma'
import { authOptions } from '../_lib/auth'
import { revalidatePath } from 'next/cache'

interface createTransactionProps {
  title: string
  date: Date
  type: boolean
  amount: number
}

export const createTransaction = async (params: createTransactionProps) => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return { statusCode: 404, errorMessage: 'User not found' }
  }

  const transaction = await db.transaction.create({
    data: {
      userId: session?.user.id,
      title: params.title,
      date: new Date(new Date(params.date).setUTCHours(0)),
      type: params.type,
      amount: params.amount,
    },
  })

  revalidatePath('/dashboard')

  return { statusCode: 200, transaction }
}

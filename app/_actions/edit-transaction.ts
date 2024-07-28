'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '../_lib/auth'
import { db } from '../_lib/prisma'
import { revalidatePath } from 'next/cache'

interface editTransactionProps {
  id: string
  data: {
    title: string
    date: Date
    type: boolean
    amount: number
  }
}

export const editTransaction = async (params: editTransactionProps) => {
  const session = await getServerSession(authOptions)

  if (!session?.user.id) {
    return { statusCode: 400, errorMessage: 'User id is missing' }
  }

  const transaction = await db.transaction.update({
    where: {
      id: params.id,
    },
    data: params.data,
  })

  revalidatePath('/transactions')

  return { statusCode: 200, transaction }
}

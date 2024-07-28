'use server'

import { getServerSession } from 'next-auth'
import { db } from '../_lib/prisma'
import { authOptions } from '../_lib/auth'
import { revalidatePath } from 'next/cache'

export const deleteTransaction = async (transactionId: string) => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return { statusCode: 404, errorMessage: 'User not found' }
  }

  const transaction = await db.transaction.delete({
    where: {
      id: transactionId,
    },
  })

  revalidatePath('/dashboard')

  return { statusCode: 200, transaction }
}

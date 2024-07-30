'use server'

import { db } from '../_lib/prisma'
import { auth } from '../_lib/auth'
import { revalidatePath } from 'next/cache'

export const deleteTransaction = async (transactionId: string) => {
  const session = await auth()

  if (!session?.user?.id) {
    return { statusCode: 400, errorMessage: 'Property user id is missing' }
  }

  const transaction = await db.transaction.delete({
    where: {
      id: transactionId,
    },
  })

  revalidatePath('/dashboard')

  return { statusCode: 200, transaction }
}

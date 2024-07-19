'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const toggleTheme = () => {
  const theme = cookies().get('theme')?.value ?? 'light'
  if (theme === 'light') {
    cookies().set('theme', 'dark')
    revalidatePath('/')
    return 'dark'
  }

  cookies().set('theme', 'light')
  revalidatePath('/')
  return 'light'
}

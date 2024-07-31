import React from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import AuthProvider from './_providers/auth'
import { cookies } from 'next/headers'
import { Toaster } from './_components/ui/toaster'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Login',
  description: 'Insira seus dados para fazer login',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const theme = cookies().get('theme')?.value ?? ''

  return (
    <html lang="en" className={`${theme} bg-background`}>
      <body className={`${poppins.className}`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}

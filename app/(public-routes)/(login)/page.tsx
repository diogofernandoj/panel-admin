'use client'

import React from 'react'
import { Button } from '@/app/_components/ui/button'
import { LogInIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'

const Login = () => {
  const handleLoginClick = async () => {
    await signIn('google')
  }

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={handleLoginClick}
      >
        <LogInIcon size={20} />
        Fazer login
      </Button>
    </div>
  )
}

export default Login

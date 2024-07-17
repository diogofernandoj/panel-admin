'use client'

import React from 'react'
import { Button } from '@/app/_components/ui/button'
import { LogInIcon } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'

const Login = () => {
  const { data } = useSession()

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
      {data?.user ? <span>{data.user.name}</span> : <span>Não logado</span>}
    </div>
  )
}

export default Login

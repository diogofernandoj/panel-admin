'use client'

import {
  ArrowLeftRightIcon,
  HandCoinsIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MoonIcon,
  SunIcon,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Separator } from './ui/separator'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Switch } from './ui/switch'
import { toggleTheme } from '../_actions/toggle-theme'
import { parseCookies } from 'nookies'
import UserBadge from '../(private-routes)/_components/user-badge'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

const Navbar = () => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const cookies = parseCookies()
    const initialTheme = cookies.theme || 'light'
    setTheme(initialTheme)
  }, [])

  const handleSwitchThemeClick = async () => {
    const newTheme = await toggleTheme()
    setTheme(newTheme)
  }

  const pathname = usePathname()
  const navbarItems = [
    {
      label: 'Dashboard',
      route: '/dashboard',
      icon: <LayoutDashboardIcon size={18} />,
    },
    {
      label: 'Transações',
      route: '/transactions',
      icon: <ArrowLeftRightIcon size={18} />,
    },
  ]

  return (
    <div className="flex justify-between items-center md:items-start px-2 border-t border-solid md:flex-col fixed bottom-0 right-0 left-0 md:top-0 z-10 bg-background w-full md:w-[300px] h-[100px] md:h-screen md:border-r">
      <div className="flex md:flex-col w-full h-full items-center">
        <div className="flex items-center justify-between md:w-full px-2 md:px-6 md:mt-6 md:mb-4">
          <div className="hidden md:flex items-center gap-1 text-primary font-bold">
            <HandCoinsIcon size={40} />
            Panel Admin
          </div>
          <div className="flex flex-col md:flex-row items-center gap-1 text-gray-300">
            {theme === 'light' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            <Switch
              onClick={handleSwitchThemeClick}
              checked={theme === 'dark'}
            />
          </div>
        </div>
        <Separator className="hidden md:block" />

        <div className="flex w-full justify-center md:flex-col md:px-2 gap-2 md:mt-8">
          {navbarItems.map((item) => (
            <Link
              href={item.route}
              key={item.route}
              className={`${
                pathname.startsWith(item.route)
                  ? 'bg-secondary'
                  : 'text-gray-400'
              } flex flex-col md:flex-row text-[10px] md:text-base items-center font-semibold md:gap-2 p-4 hover:bg-secondary transition rounded-lg w-max h-max md:w-full`}
            >
              {item.icon}
              <span className="mt-1">{item.label}</span>
            </Link>
          ))}
          <Popover>
            <PopoverTrigger className="md:hidden">
              <UserBadge />
            </PopoverTrigger>
            <PopoverContent>
              <button
                onClick={async () => await signOut()}
                className="flex items-center gap-2 text-xs text-foreground opacity-50 transition hover:opacity-100 w-max font-semibold"
              >
                <LogOutIcon size={18} /> <span>Sair</span>
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <button
        onClick={async () => await signOut()}
        className="hidden md:flex items-center gap-2 p-6 text-xs text-foreground opacity-50 transition hover:opacity-100 w-max font-semibold"
      >
        <LogOutIcon size={18} /> <span>Sair</span>
      </button>
    </div>
  )
}

export default Navbar

'use client'

import {
  ArrowLeftRightIcon,
  HandCoinsIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  UsersIcon,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Separator } from './ui/separator'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Switch } from './ui/switch'
import { toggleTheme } from '../_actions/toggle-theme'
import { parseCookies } from 'nookies'

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
      icon: <LayoutDashboardIcon size={20} />,
    },
    {
      label: 'Transações',
      route: '/transactions',
      icon: <ArrowLeftRightIcon size={20} />,
    },
    {
      label: 'Funcionários',
      route: '/workers',
      icon: <UsersIcon size={20} />,
    },
    {
      label: 'Configurações',
      route: '/settings',
      icon: <SettingsIcon size={20} />,
    },
  ]

  return (
    <div className="flex flex-col  w-[350px] h-screen border-r border-solid justify-between">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mt-5 px-8">
          <div className="flex items-center gap-1 text-primary font-bold">
            <HandCoinsIcon size={40} />
            Panel Admin
          </div>
          <div className="flex items-center gap-1 text-gray-300">
            {theme === 'light' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            <Switch
              onClick={handleSwitchThemeClick}
              checked={theme === 'dark'}
            />
          </div>
        </div>
        <div className="pt-4 px-2">
          <Separator />
        </div>

        <div className="flex flex-col mt-8 px-4 gap-2">
          {navbarItems.map((item) => (
            <Link
              href={item.route}
              key={item.route}
              className={`${
                pathname.startsWith(item.route)
                  ? 'bg-secondary'
                  : 'text-gray-400'
              } flex items-center font-semibold gap-2 p-4 hover:bg-secondary transition rounded-lg`}
            >
              {item.icon}
              <span className="mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <button
        onClick={async () => await signOut()}
        className="flex items-center gap-2 p-6 text-xs text-gray-300 transition hover:text-white w-max font-semibold"
      >
        <LogOutIcon size={18} /> Sair
      </button>
    </div>
  )
}

export default Navbar

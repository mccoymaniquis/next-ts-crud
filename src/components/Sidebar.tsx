'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { FC } from 'react'
import { useCookie } from 'react-use'
import DashboardIcon from '../../public/icons/dashboard.svg'

interface SidebarItem {
  name: string
  href: string
  icon?: JSX.Element
}

const sidebarItems: SidebarItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon className='text-gray-700' height={25} width={25} />,
  },
  // { name: 'About', href: '/about' },
  // { name: 'Services', href: '/services' },
  // { name: 'Contact', href: '/contact' },
]

const Sidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()
  const pathName = usePathname()
  const [, deleteCookie] = useCookie(process.env.NEXT_PUBLIC_COOKIE_NAME)

  const handleLogout = () => {
    deleteCookie('')
    router.push('/sign-in')
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='flex flex-col'>
      {/* Sidebar Toggle Button */}
      <div className='bg-gray-800 flex justify-end p-2'>
        <button
          onClick={toggleSidebar}
          className=' text-white md:hidden flex justify-end'
        >
          {isOpen ? '[]' : '|||'}
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`h-screen bg-gray-800 text-white flex flex-col ${
          isOpen ? 'w-24 md:w-40 lg:w-64' : 'w-0 md:w-40 lg:w-64'
        } overflow-hidden transition-width duration-300`}
      >
        <span className='font-bold p-2 text-lg'>My App</span>
        <nav className='flex-1 p-2'>
          <ul>
            {sidebarItems.map((item) => (
              <li
                key={item.name}
                className={`mb-2 p-2 rounded hover:bg-gray-700 ${
                  pathName === item.href ? 'bg-gray-700 ' : ''
                }`}
              >
                <Link
                  href={item.href}
                  className='flex item-center justify-center'
                >
                  {item.icon && <span className='mr-3'>{item.icon}</span>}
                  <span className='hidden md:block'>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className='flex p-2 '>
          <button
            className='flex justify-center items-center text-white font-bold p-2 w-full rounded hover:bg-gray-700'
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

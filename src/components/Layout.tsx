import { FC, ReactNode } from 'react'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='flex-1 p-4 bg-gray-100'>{children}</main>
    </div>
  )
}

export default Layout

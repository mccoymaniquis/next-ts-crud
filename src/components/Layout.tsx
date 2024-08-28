import { FC, ReactNode } from 'react'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex h-screen '>
      <Sidebar />
      <main className='flex-1 overflow-x-auto'>{children}</main>
    </div>
  )
}

export default Layout

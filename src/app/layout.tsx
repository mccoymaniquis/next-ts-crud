import type { Metadata } from 'next'
import '../styles/globals.css'

import ReactQueryProvider from 'providers/react-query-provider/ReactQueryProvider'

export const metadata: Metadata = {
  title: 'TS CRUD',
  description: 'TS CRUD',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}

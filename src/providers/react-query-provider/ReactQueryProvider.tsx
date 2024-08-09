'use client'

import { useState, ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface ReactQueryProviderProps {
    children: React.ReactNode
}
const ReactQueryProvider = (props: ReactQueryProviderProps): ReactElement => {
    const {children} = props;
    const [queryClient] = useState(
    () =>
        new QueryClient({
        defaultOptions: {
            queries: {},
        },
        })
    )

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider

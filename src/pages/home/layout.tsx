import React, { PropsWithChildren } from 'react'

import { NewsFeed } from '@/features/newsFeed'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NewsFeed />
      {children}
    </>
  )
}

export default Layout

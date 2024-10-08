import React from 'react'

import { Layout, LayoutWithSidebar } from '@/common'

export type AccessLevel = 'anonymous' | 'user'

export default function withLayout(accessLevel: AccessLevel = 'anonymous') {
  if (accessLevel === 'user') {
    return function getLayout(page: React.ReactElement) {
      return <LayoutWithSidebar>{page}</LayoutWithSidebar>
    }
  }

  return function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
  }
}

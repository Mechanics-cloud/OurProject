import { PropsWithChildren } from 'react'

import { withProtection } from '@/common/HOC/withProtection'

import Layout from './layout'

const HomePage = ({ children }: PropsWithChildren) => {
  return <Layout>{children}</Layout>
}

export default withProtection(HomePage)

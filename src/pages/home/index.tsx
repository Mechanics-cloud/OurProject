import { withProtection } from '@/common/HOC/withProtection'

import { Home } from '../../features/home/Home'

const HomePage = () => {
  return <Home />
}

export default withProtection(HomePage)

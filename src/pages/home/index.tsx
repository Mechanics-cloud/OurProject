import { withProtection } from '@/common/HOC/withProtection'

import { Home } from '../../features/home/ui/Home'

const HomePage = () => {
  return <Home />
}

export default withProtection(HomePage)

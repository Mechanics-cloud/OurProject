import { withProtection } from '@/common/HOC/withProtection'

import { NewsFeed } from '../../features/NewsFeed/ui/NewsFeed'

const HomePage = () => {
  return <NewsFeed />
}

export default withProtection(HomePage)

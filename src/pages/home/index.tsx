import { withProtection } from '@/common/HOC/withProtection'
import { NewsFeed } from '@/features/newsFeed'

const HomePage = () => {
  return <NewsFeed />
}

export default withProtection(HomePage)

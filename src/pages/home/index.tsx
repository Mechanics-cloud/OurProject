import { withProtection } from '@/common'
import { NewsFeed } from '@/features/newsFeed'

const HomePage = () => {
  return <NewsFeed />
}

export default withProtection(HomePage)

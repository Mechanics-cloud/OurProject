import { withProtection } from '@/common'
import { GitHubCallback } from '@/features/auth/ui/GitHubCallback'

const GitHubPage = () => {
  return <GitHubCallback />
}

export default withProtection(GitHubPage)

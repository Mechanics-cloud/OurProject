import { withProtection } from '@/common'
import { SearchUser } from '@/features/searchUser'

function SearchPage() {
  return <SearchUser />
}

export default withProtection(SearchPage)

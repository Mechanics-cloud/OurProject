import { withProtection } from '@/common'
import { Profile } from '@/features/profile/ui/Profile'
import { observer } from 'mobx-react-lite'

const ProfilePage = observer(() => {
  return <Profile />
})

export default withProtection(ProfilePage, { isPublic: true })

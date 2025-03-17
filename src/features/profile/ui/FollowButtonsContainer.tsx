import { FollowButtons, followSystemStore } from '@/features/followSystem'
import { profileStore } from '@/features/profile/model/profileStore'
import { observer } from 'mobx-react-lite'

type Props = {
  className?: string
  userId: number
}

export const FollowButtonsContainer = observer(
  ({ className, userId }: Props) => {
    const isAuthenticated = !!profileStore.userProfile
    const isOwnProfile = profileStore.userProfile?.id === userId

    if (!isAuthenticated || isOwnProfile) {
      return null
    }

    return (
      <FollowButtons
        className={className}
        isFollowing={followSystemStore.isFollowingUser(userId)}
        userId={userId}
      />
    )
  }
)

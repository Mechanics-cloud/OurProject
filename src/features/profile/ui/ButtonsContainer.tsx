import { Button } from '@/common'
import { FollowButtons, followSystemStore } from '@/features/followSystem'
import { profileStore } from '@/features/profile/model/profileStore'
import { observer } from 'mobx-react-lite'

type Props = {
  className?: string
  userId: number
}

export const ButtonsContainer = observer(({ className, userId }: Props) => {
  const isAuthenticated = !!profileStore.userProfile

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className={'flex gap-3 flex-col flex-wrap md:flex-row'}>
      <FollowButtons
        className={className}
        isFollowing={followSystemStore.isFollowingUser(userId)}
        userId={userId}
      />
      <Button variant={'secondary'}>Send Message</Button>
    </div>
  )
})

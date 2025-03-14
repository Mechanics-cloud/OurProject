import { Button, useTranslation } from '@/common'
import { followSystemStore } from '@/features/followSystem/model/followSystemStore'
import { observer } from 'mobx-react-lite'

type Props = {
  isFollowing: boolean
  userId: number
}

export const FollowButtons = observer(({ isFollowing, userId }: Props) => {
  const { t } = useTranslation()

  return isFollowing ? (
    <Button
      disabled={followSystemStore.isLoading}
      onClick={() => followSystemStore.unsubscribeFromUser(userId)}
      variant={'secondary'}
    >
      {t.post.unfollow}
    </Button>
  ) : (
    <Button
      disabled={followSystemStore.isLoading}
      onClick={() => followSystemStore.subscribeToUser(userId)}
      variant={'primary'}
    >
      {t.post.follow}
    </Button>
  )
})

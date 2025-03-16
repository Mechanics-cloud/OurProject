import React from 'react'

import { Button, useTranslation } from '@/common'
import { followSystemStore } from '@/features/followSystem/model/followSystemStore'
import { observer } from 'mobx-react-lite'

type Props = {
  isFollowing: boolean
  userId: number
} & React.ComponentPropsWithoutRef<'button'>

export const FollowButtons = observer(
  ({ className, isFollowing, userId }: Props) => {
    const { t } = useTranslation()

    const onUnsubscribeFromUser = () => {
      followSystemStore.unsubscribeFromUser(userId)
    }
    const onSubscribeFromUser = () => {
      followSystemStore.subscribeToUser(userId)
    }

    const isLoading = followSystemStore.isLoading

    return isFollowing ? (
      <Button
        className={`${className} ${isLoading ? 'animate-pulse' : ''}`}
        disabled={isLoading}
        onClick={onUnsubscribeFromUser}
        variant={'outline'}
      >
        {t.post.unfollow}
      </Button>
    ) : (
      <Button
        className={`${className} border border-accent-700 ${
          isLoading ? 'animate-pulse' : ''
        }`}
        disabled={isLoading}
        onClick={onSubscribeFromUser}
        variant={'primary'}
      >
        {t.post.follow}
      </Button>
    )
  }
)

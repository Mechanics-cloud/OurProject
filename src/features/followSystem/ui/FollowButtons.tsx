import React, { useState } from 'react'

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

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onUnsubscribeFromUser = () => {
      setIsLoading(true)
      followSystemStore.unsubscribeFromUser(userId).then((res) => {
        setIsLoading(false)
      })
    }
    const onSubscribeFromUser = () => {
      setIsLoading(true)
      followSystemStore.subscribeToUser(userId).then((res) => {
        setIsLoading(false)
      })
    }

    return isFollowing ? (
      <Button
        className={`${className} ${isLoading ? 'animate-pulse' : ''}`}
        disabled={isLoading}
        onClick={onUnsubscribeFromUser}
        variant={'outline'}
      >
        {t.profilePage.unfollow}
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
        {t.profilePage.follow}
      </Button>
    )
  }
)

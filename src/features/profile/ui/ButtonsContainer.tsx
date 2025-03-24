import { Button, ProtectedPaths, useTranslation } from '@/common'
import { FollowButtons, followSystemStore } from '@/features/followSystem'
import { profileStore } from '@/features/profile/model/profileStore'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'

type Props = {
  className?: string
  userId: number
}

export const ButtonsContainer = observer(({ className, userId }: Props) => {
  const isAuthenticated = !!profileStore.userProfile
  const { t } = useTranslation()

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className={'flex gap-3 flex-col flex-wrap md:flex-row'}>
      <FollowButtons
        className={className}
        isFollowing={followSystemStore.isFollowingUser(userId)}
        userId={userId}
      >
        {t.profilePage.unfollow}
      </FollowButtons>
      {/*<Button variant={'secondary'}>Send Message</Button>*/}
      <Button
        asChild
        variant={'secondary'}
      >
        <Link
          href={{
            pathname: ProtectedPaths.messenger,
            query: { dialogPartnerId: userId },
          }}
        >
          {t.profilePage.sendMessage}
        </Link>
      </Button>
    </div>
  )
})

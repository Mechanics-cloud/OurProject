import React from 'react'

import { Button, Nullable, Search, SimpleModal, UserMiniLink } from '@/common'
import { generalStore } from '@/core/store'
import { followSystemStore } from '@/features/followSystem'
import { Likes } from '@/features/posts'
import { observer } from 'mobx-react-lite'

type Props = {
  isModalOpen: boolean
  likeUsers: Nullable<Likes[]>
  onModalClose: () => void
  search: string
  setSearch: (search: string) => void
}
export const LikesModal = observer(
  ({ isModalOpen, likeUsers, onModalClose, search, setSearch }: Props) => {
    const { user } = generalStore
    const { followingUsers, subscribeToUser, unsubscribeFromUser } =
      followSystemStore

    const onButtonClick = async (user: Likes) => {
      if (followingUsers.has(user.userId)) {
        await unsubscribeFromUser(user.userId)
      } else {
        await subscribeToUser(user.userId)
      }
    }

    return (
      <SimpleModal
        className={'w-[640px]'}
        onOpenChange={onModalClose}
        open={isModalOpen}
        title={'Likes'}
      >
        <Search
          className={'px-3'}
          search={search}
          setSearch={setSearch}
        />
        {likeUsers?.map((item) => (
          <div
            className={'flex items-center justify-between mb-6 px-3'}
            key={item.userId}
          >
            <UserMiniLink
              name={item.userName}
              src={item.avatars[0]?.url}
            />
            {item.userId !== user?.userId && (
              <Button
                className={'w-[117px]'}
                onClick={() => onButtonClick(item)}
                variant={
                  followingUsers.has(item.userId) ? 'outline' : 'primary'
                }
              >
                {followingUsers.has(item.userId) ? 'Unfollow' : 'Follow'}
              </Button>
            )}
          </div>
        ))}
      </SimpleModal>
    )
  }
)

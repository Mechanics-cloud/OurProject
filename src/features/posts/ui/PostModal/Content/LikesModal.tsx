import React from 'react'

import { Nullable, Search, SimpleModal, UserMiniLink } from '@/common'
import { generalStore } from '@/core/store'
import { FollowButtons, followSystemStore } from '@/features/followSystem'
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
              href={`/profile/${item.userId}`}
              name={item.userName}
              src={item.avatars[0]?.url}
            />
            {item.userId !== generalStore.user?.userId && (
              <FollowButtons
                className={'w-[117px]'}
                isFollowing={followSystemStore.isFollowingUser(item.userId)}
                userId={item.userId}
              />
            )}
          </div>
        ))}
      </SimpleModal>
    )
  }
)

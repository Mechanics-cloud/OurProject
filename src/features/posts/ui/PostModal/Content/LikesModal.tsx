import React, { useEffect, useState } from 'react'

import { Nullable, SimpleModal, TextField, UserMiniLink } from '@/common'
import { generalStore } from '@/core/store'
import { FollowButtons, followSystemStore } from '@/features/followSystem'
import { Likes, usePostStore } from '@/features/posts'
import { observer } from 'mobx-react-lite'

type Props = {
  isModalOpen: boolean
  onModalClose: () => void
}
export const LikesModal = observer(({ isModalOpen, onModalClose }: Props) => {
  const [search, setSearch] = useState('')
  const { likeStore } = usePostStore()
  const [likeUsers, setLikeUsers] = useState<Nullable<Likes[]>>(likeStore.items)

  useEffect(() => {
    if (likeStore.items) {
      setLikeUsers(likeStore.items)
    }
  }, [likeStore.items])

  useEffect(() => {
    if (search) {
      const filteredLikesUsers = likeStore.items?.filter((user) =>
        user.userName.toLowerCase().startsWith(search.toLowerCase())
      )

      setLikeUsers(filteredLikesUsers || [])
    } else {
      setLikeUsers(likeStore.items)
    }
  }, [search, likeStore.items])

  return (
    <SimpleModal
      className={'w-[640px]'}
      onOpenChange={onModalClose}
      open={isModalOpen}
      title={'Likes'}
    >
      <TextField
        className={'bg-transparent px-3'}
        label={''}
        onChange={(e) => setSearch(e.target.value)}
        type={'search'}
        value={search}
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
})

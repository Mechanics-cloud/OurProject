import React from 'react'

import {
  CopyOutline,
  Edit2Outline,
  PersonRemoveOutline,
  TrashOutline,
} from '@/assets/icons'
import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import { PathService, PublicPaths, Typography, useTranslation } from '@/common'
import { generalStore } from '@/core/store'
import { PostHeaderPopover, usePostStore } from '@/features/posts'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export type MappedData = {
  display: boolean
  icon: React.JSX.Element
  id: string
  onClick: () => void
  text: string
}

export const PostInfoHeader = () => {
  const { t } = useTranslation()
  const { postStore } = usePostStore()
  const { user } = generalStore
  const router = useRouter()

  const onEditClick = () => {
    postStore.startEditing()
  }

  const onDeletePost = async () => {
    try {
      if (postStore?.post) {
        await postStore.deletePost(postStore?.post?.id)
        await router.push(
          PathService.generatePath(PublicPaths.userProfile, {
            userId: user?.userId,
          })
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  const infoHeaderData: MappedData[] = [
    {
      display: user?.userId === postStore.post?.ownerId,
      icon: <Edit2Outline className={'flex-shrink-0 size-6'} />,
      id: 'edit',
      onClick: onEditClick,
      text: t.post.editPost,
    },
    {
      display: user?.userId === postStore.post?.ownerId,
      icon: <TrashOutline className={'flex-shrink-0 size-6'} />,
      id: 'delete',
      onClick: onDeletePost,
      text: t.post.deletePost,
    },
    {
      display: user?.userId !== postStore.post?.ownerId,
      icon: <PersonRemoveOutline className={'flex-shrink-0 size-6'} />,
      id: 'remove',
      onClick: () => {
        alert('remove')
      },
      text: t.post.unfollow,
    },
    {
      display: user?.userId !== postStore.post?.ownerId,
      icon: <CopyOutline className={'flex-shrink-0 size-6'} />,
      id: 'copy',
      onClick: () => {
        alert('copy')
      },
      text: t.post.copyLink,
    },
  ]

  return (
    <div
      className={
        'flex items-center gap-3 py-3 md:px-6 px-1 border-b border-dark-100 box-border w-full justify-between'
      }
    >
      <div className={'flex items-center gap-3'}>
        <Link
          href={PathService.generatePath(PublicPaths.userProfile, {
            userId: postStore.post?.ownerId,
          })}
        >
          <Image
            alt={`Post owner avatar`}
            className={'rounded-full pr-0'}
            height={36}
            priority
            src={postStore.post?.avatarOwner || anonymous}
            width={36}
          />
        </Link>
        <Typography variant={'h3'}>{postStore.post?.userName}</Typography>
      </div>
      {user && (
        <PostHeaderPopover
          data={infoHeaderData}
          /*open={open}
          setOpen={setOpen}*/
        />
      )}
    </div>
  )
}

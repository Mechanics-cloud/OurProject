import React, { useState } from 'react'

import {
  CopyOutline,
  Edit2Outline,
  MoreHorizontalOutline,
  PersonRemoveOutline,
  TrashOutline,
} from '@/assets/icons'
import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import {
  PathService,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PublicPaths,
  Typography,
  useTranslation,
} from '@/common'
import { generalStore } from '@/core/store'
import { usePostStore } from '@/features/posts/model/postStoreProvider'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const PostInfoHeader = () => {
  const { t } = useTranslation()
  const { postStore } = usePostStore()
  const { user } = generalStore
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const onEditClick = () => {
    postStore.startEditing()
    setOpen(false)
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

  const infoHeaderData = [
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
        'flex items-center gap-3 py-3 px-6 border-b border-dark-100 box-border'
      }
    >
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
      {user && (
        <Popover
          onOpenChange={setOpen}
          open={open}
        >
          <PopoverTrigger asChild>
            <button
              className={'ml-auto'}
              title={'menu'}
              type={'button'}
            >
              <MoreHorizontalOutline
                aria-label={'Call settings'}
                className={`size-6 active:text-accent-500 hover:text-accent-500 cursor-pointer ${
                  open ? 'text-accent-500' : ''
                }`}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className={'absolute z-50 min-w-max min-h-[85px] -right-3 p-3'}
            sideOffset={3}
          >
            <nav>
              <ul className={'flex flex-col gap-3'}>
                {infoHeaderData.map(
                  (item) =>
                    item.display && (
                      <button
                        className={`flex items-center gap-2 hover:text-accent-500`}
                        key={item.id}
                        onClick={item.onClick}
                        type={'button'}
                      >
                        {item.icon}
                        <span className={'text-sm'}>{item.text}</span>
                      </button>
                    )
                )}
              </ul>
            </nav>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

import React from 'react'

import avatarPlaceholder from '@/assets/images/user-avatar-placeholder.jpg'
import { Nullable, ProtectedPaths, Typography, cn } from '@/common'
import { formatIsoDateToShortDate } from '@/common/utils/formateChatDate'
import { generalStore } from '@/core/store'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Message, PartnerInfoDTO } from '../../api'

type Props = {
  chosenChat: Nullable<number>
  item: Message
  onGetDialogPartnerMessagesById: (
    partnerId: number,
    info: PartnerInfoDTO
  ) => void
}
export const ChatsListItem = ({
  chosenChat,
  item,
  onGetDialogPartnerMessagesById,
}: Props) => {
  const router = useRouter()
  const userId = generalStore.user?.userId
  const { avatars, createdAt, messageText, ownerId, receiverId, userName } =
    item
  const createdDateAt = formatIsoDateToShortDate(createdAt, router.locale)
  const avatar = avatars.length === 0 ? avatarPlaceholder : avatars[1].url
  const partnerId = ownerId === userId ? receiverId : ownerId

  const ItemContent = (
    <>
      <div
        className={
          'h-[48px] aspect-square relative rounded-full overflow-hidden'
        }
      >
        <Image
          alt={userName}
          height={48}
          src={avatar}
          width={48}
        />
      </div>
      <div className={'flex flex-col flex-1 min-w-0 gap-1'}>
        <div className={'flex justify-between w-full gap-2'}>
          <Typography
            className={'whitespace-nowrap overflow-hidden text-ellipsis'}
            variant={'reg14'}
          >
            {userName}
          </Typography>
          <Typography variant={'small'}>{createdDateAt}</Typography>
        </div>
        <Typography
          className={'whitespace-nowrap overflow-hidden text-ellipsis'}
          variant={'small'}
        >
          {messageText}
        </Typography>
      </div>
    </>
  )

  const commonClasses = cn(
    'flex w-full p-3 gap-3 border-b border-dark-300 transition-colors duration-500',
    chosenChat === partnerId
      ? 'bg-dark-100'
      : 'hover:bg-dark-100 cursor-pointer'
  )

  return chosenChat === partnerId ? (
    <div className={commonClasses}>{ItemContent}</div>
  ) : (
    <Link
      className={commonClasses}
      href={{
        pathname: ProtectedPaths.messenger,
        query: { dialogPartnerId: partnerId },
      }}
      onClick={() =>
        onGetDialogPartnerMessagesById(partnerId, {
          avatars: avatars,
          partnerId,
          userName: userName,
        })
      }
      shallow
    >
      {ItemContent}
    </Link>
  )
}

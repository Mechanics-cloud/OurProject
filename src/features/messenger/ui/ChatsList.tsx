import React, { useCallback, useEffect, useState } from 'react'

import avatarPlaceholder from '@/assets/images/user-avatar-placeholder.jpg'
import {
  Nullable,
  ProtectedPaths,
  Typography,
  cn,
  useTranslation,
} from '@/common'
import { formatIsoDateToShortDate } from '@/common/utils/formateChatDate'
import { generalStore } from '@/core/store'
import { PartnerInfoDTO } from '@/features/messenger/api'
import { messengerStore } from '@/features/messenger/model/stores/messengerStore'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const ChatsList = observer(() => {
  const router = useRouter()
  const [chosenChat, setChosenChat] = useState<Nullable<number>>(null)
  const userId = generalStore.user?.userId
  const setDialogPartnerInfo = messengerStore.setDialogPartnerInfo
  const chatsList = messengerStore.chatsListData
  const { t } = useTranslation()
  const getDialogPartnerInfo = messengerStore.getDialogPartnerInfo
  const getDialogPartnerMessagesById =
    messengerStore.getDialogPartnerMessagesById
  const dialogPartnerId = router.query.dialogPartnerId
    ? Number(router.query.dialogPartnerId)
    : null

  useEffect(() => {
    const controller = new AbortController()

    if (dialogPartnerId) {
      getDialogPartnerMessagesById({
        dialogPartnerId,
        signal: controller.signal,
      })
      getDialogPartnerInfo(dialogPartnerId, controller.signal)
    }

    return () => {
      controller.abort()
    }
  }, [getDialogPartnerMessagesById, getDialogPartnerInfo, dialogPartnerId])

  const onGetDialogPartnerMessagesById = useCallback(
    async (partnerId: number, info: PartnerInfoDTO) => {
      if (chosenChat === partnerId) {
        return
      }

      setChosenChat(partnerId)
      setDialogPartnerInfo(info)
      await getDialogPartnerMessagesById({ dialogPartnerId: partnerId })
    },
    [chosenChat, getDialogPartnerMessagesById, setDialogPartnerInfo]
  )

  return (
    <div
      className={
        'col-span-1 row-span-1 border-r flex justify-start items-center flex-col border-dark-300 bg-dark-500'
      }
    >
      {!chatsList || chatsList.items.length === 0 ? (
        <div
          className={
            'w-full h-full flex justify-center flex-col gap-5 items-center px-2'
          }
        >
          <span className={'text-pretty text-center'}>
            {t.messenger.noMessages}
          </span>
          <span className={'text-pretty text-center'}>
            {t.messenger.shouldUseSearch}
          </span>
        </div>
      ) : (
        chatsList.items.map((chat) => {
          const createdAt = formatIsoDateToShortDate(
            chat.createdAt,
            router.locale
          )

          const avatar =
            chat.avatars.length === 0 ? avatarPlaceholder : chat.avatars[1].url

          const partnerId =
            userId === chat.ownerId ? chat.receiverId : chat.ownerId

          return (
            <Link
              className={cn(
                chosenChat === partnerId
                  ? 'bg-dark-100'
                  : 'hover:bg-dark-100 cursor-pointer',
                'flex w-full p-3 gap-3 border-b border-dark-300 transition-colors duration-500'
              )}
              href={{
                pathname: ProtectedPaths.messenger,
                query: { dialogPartnerId: partnerId },
              }}
              key={chat.id}
              onClick={() =>
                onGetDialogPartnerMessagesById(partnerId, {
                  avatars: chat.avatars,
                  partnerId,
                  userName: chat.userName,
                })
              }
              shallow
            >
              <div
                className={
                  'h-[48px] aspect-square relative rounded-full overflow-hidden'
                }
              >
                <Image
                  alt={chat.userName}
                  height={48}
                  src={avatar}
                  width={48}
                />
              </div>
              <div className={'flex flex-col flex-1 min-w-0 gap-1'}>
                <div className={'flex justify-between w-full gap-2'}>
                  <Typography
                    className={
                      'whitespace-nowrap overflow-hidden text-ellipsis'
                    }
                    variant={'reg14'}
                  >
                    {chat.userName}
                  </Typography>
                  <Typography variant={'small'}>{createdAt}</Typography>
                </div>
                <Typography
                  className={'whitespace-nowrap overflow-hidden text-ellipsis'}
                  variant={'small'}
                >
                  {chat.messageText}
                </Typography>
              </div>
            </Link>
          )
        })
      )}
    </div>
  )
})

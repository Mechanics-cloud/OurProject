import React, { useState } from 'react'

import { Nullable, useTranslation } from '@/common'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

import { ChatsListDTO, PartnerInfoDTO } from '../../api'
import { messengerStore } from '../../model/stores/messengerStore'
import { ChatsListItem } from './ChatsListItem'

type Props = {
  chatsList: Nullable<ChatsListDTO>
}

export const ChatsList = observer(({ chatsList }: Props) => {
  const router = useRouter()
  const dialogPartnerId = router.query.dialogPartnerId
    ? Number(router.query.dialogPartnerId)
    : null
  const [chosenChat, setChosenChat] =
    useState<Nullable<number>>(dialogPartnerId)
  const setDialogPartnerInfo = messengerStore.setDialogPartnerInfo
  const { t } = useTranslation()

  const onGetDialogPartnerMessagesById = (
    partnerId: number,
    info: PartnerInfoDTO
  ) => {
    setChosenChat(partnerId)
    setDialogPartnerInfo(info)
  }

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
        chatsList.items.map((item) => {
          return (
            <ChatsListItem
              chosenChat={chosenChat}
              item={item}
              key={item.id}
              onGetDialogPartnerMessagesById={onGetDialogPartnerMessagesById}
            />
          )
        })
      )}
    </div>
  )
})

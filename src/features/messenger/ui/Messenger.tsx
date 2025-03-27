import { useEffect } from 'react'

import { Typography, useTranslation } from '@/common'
import { FindChat } from '@/features/messenger/ui/FindChat'
import { observer } from 'mobx-react-lite'

import { messengerStore } from '../model/stores/messengerStore'
import { Chat } from './Chat'
import { PartnerInfo } from './PartnerInfo'
import { ChatsList } from './chatsList/ChatsList'

export const Messenger = observer(() => {
  const connectMessengerWSEvents = messengerStore.connectMessengerWSEvents
  const disconnectMessengerWSEvents = messengerStore.disconnectMessengerWSEvents
  const getMessengerData = messengerStore.getMessengerData
  const { t } = useTranslation()

  useEffect(() => {
    const controller = new AbortController()

    connectMessengerWSEvents()
    getMessengerData({ signal: controller.signal })

    return () => {
      disconnectMessengerWSEvents()
      controller.abort()
    }
  }, [connectMessengerWSEvents, disconnectMessengerWSEvents, getMessengerData])

  return (
    <div className={'flex justify-center items-center'}>
      <div
        className={
          'container h-[calc(theme(height.headCalc)-82px)] flex flex-col gap-[13px]'
        }
      >
        <Typography
          className={'mt-9'}
          variant={'h1'}
        >
          {t.messenger.mainTitle}
        </Typography>
        <div
          className={
            'border border-dark-300 grid grid-cols-[minmax(0,270px)_1fr] grid-rows-[72px_calc(theme(height.headCalc)-82px-151px)] flex-1'
          }
        >
          <FindChat />
          <PartnerInfo />
          <ChatsList />
          <Chat />
        </div>
      </div>
    </div>
  )
})

import { useEffect } from 'react'

import { TextField, Typography, useTranslation } from '@/common'
import { WebSocketApi } from '@/common/api'
import { observer } from 'mobx-react-lite'

import { messengerStore } from '../model/stores/messengerStore'
import { Chat } from './Chat'
import { ChatsList } from './ChatsList'
import { PartnerInfo } from './PartnerInfo'

export const Messenger = observer(() => {
  const connectMessengerWSEvents = messengerStore.connectMessengerWSEvents
  const disconnectMessengerWSEvents = messengerStore.disconnectMessengerWSEvents
  const getMessengerData = messengerStore.getMessengerData
  const { t } = useTranslation()

  useEffect(() => {
    const controller = new AbortController()

    WebSocketApi.onceConnected(() => {
      console.log('messenger WS connected')
      connectMessengerWSEvents()
      getMessengerData({ signal: controller.signal })
    })

    return () => {
      console.log('messenger WS disconnected')

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
          <div
            className={
              'px-3 col-span-1 row-span-1 border-r border-b border-dark-300 bg-dark-500 flex items-center'
            }
          >
            <TextField
              bottomMarginForError={false}
              label={''}
              placeholder={t.messenger.searchPlaceholder}
              type={'search'}
            />
          </div>

          <PartnerInfo />
          <ChatsList />
          <Chat />
        </div>
      </div>
    </div>
  )
})

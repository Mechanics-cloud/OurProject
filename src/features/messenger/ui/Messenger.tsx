import { Typography, useTranslation } from '@/common'
import { observer } from 'mobx-react-lite'

import { useMessenger } from '../model/useMessenger'
import { Chat } from './Chat'
import { FindChat } from './FindChat'
import { PartnerInfo } from './PartnerInfo'
import { ChatsList } from './chatsList/ChatsList'

export const Messenger = observer(() => {
  const { t } = useTranslation()

  useMessenger()

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

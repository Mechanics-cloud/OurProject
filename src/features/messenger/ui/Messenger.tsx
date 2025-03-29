import { Typography, useTranslation } from '@/common'
import { useMessenger } from '@/features/messenger/model/useMessenger'
import { observer } from 'mobx-react-lite'

import { FindChat } from './FindChat'
import { PartnerInfo } from './PartnerInfo'
import { Chat } from './chat/Chat'
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
          <div
            className={
              'px-3 col-span-1 row-span-1 border-r border-b border-dark-300 bg-dark-500 flex items-center'
            }
          >
            <FindChat />
          </div>
          <div
            className={
              'col-span-1 row-span-1 border-b border-dark-300 bg-dark-500 flex px-3 items-center'
            }
          >
            <PartnerInfo />
          </div>
          <div
            className={
              'col-span-1 row-span-1 border-r border-dark-300 bg-dark-500'
            }
          >
            <ChatsList />
          </div>
          <div
            className={'col-span-1 row-span-1 flex items-center justify-center'}
          >
            <Chat />
          </div>
        </div>
      </div>
    </div>
  )
})

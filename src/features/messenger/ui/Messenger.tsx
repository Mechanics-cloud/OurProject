import { ArrowBackOutline, ArrowForwardOutline } from '@/assets/icons'
import { Button, Typography, cn, useTranslation } from '@/common'
import {
  MessengerProvider,
  useMessengerContext,
} from '@/features/messenger/model/MessengerContext'
import { useMessenger } from '@/features/messenger/model/useMessenger'
import { observer } from 'mobx-react-lite'

import { FindChat } from './FindChat'
import { PartnerInfo } from './PartnerInfo'
import { Chat } from './chat/Chat'
import { ChatsList } from './chatsList/ChatsList'

const Messenger = observer(() => {
  const { t } = useTranslation()
  const { openedTab, setChatAsOpenedTab, setListAsOpenedTab } =
    useMessengerContext()

  useMessenger()

  return (
    <div
      className={'w-full h-[calc(theme(height.headCalc)-82px)] flex flex-col'}
    >
      <Typography
        className={'pt-9 pb-3'}
        variant={'h1'}
      >
        {t.messenger.mainTitle}
      </Typography>

      <div className={'border border-dark-300 flex flex-1 min-h-0 relative'}>
        <div
          className={cn(
            openedTab === 'list' ? 'flex' : 'hidden',
            'absolute inset-0 z-10 md:static md:z-0 md:flex flex-col border-r border-dark-300 md:min-w-[270px] flex-1 min-h-0 md:max-w-[270px]'
          )}
        >
          <div
            className={
              'h-[72px] px-3 border-b border-dark-300 bg-dark-500 flex items-center shrink-0'
            }
          >
            <FindChat />
            <Button
              className={'md:hidden px-1.5 text-light-100 ml-3'}
              onClick={setChatAsOpenedTab}
              variant={'text'}
            >
              <ArrowForwardOutline
                height={'30'}
                width={'30'}
              />
            </Button>
          </div>
          <div className={'bg-dark-500 flex-1 min-h-0'}>
            <ChatsList />
          </div>
        </div>
        <div
          className={cn(
            openedTab === 'chat' ? 'flex' : 'hidden',
            'inset-0 absolute md:static md:flex flex-col flex-1 min-h-0'
          )}
        >
          <div
            className={
              'h-[72px] border-b border-dark-300 bg-dark-500 flex shrink-0 px-3 items-center justify-start'
            }
          >
            <Button
              className={'md:hidden px-1.5 text-light-100'}
              onClick={setListAsOpenedTab}
              variant={'text'}
            >
              <ArrowBackOutline
                height={'30'}
                width={'30'}
              />
            </Button>
            <PartnerInfo />
          </div>
          <div
            className={
              'flex-1 min-h-0 overflow-hidden p-[1px] flex items-center justify-center'
            }
          >
            <Chat />
          </div>
        </div>
      </div>
    </div>
  )
})

export const MessengerWithProvider = () => {
  return (
    <MessengerProvider>
      <Messenger />
    </MessengerProvider>
  )
}

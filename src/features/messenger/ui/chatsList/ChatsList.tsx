import { CircleLoader, ScrollArea, useTranslation } from '@/common'
import { useChatList } from '@/features/messenger/model/useChatList'
import { observer } from 'mobx-react-lite'

import { ChatsListItem } from './ChatsListItem'

export const ChatsList = observer(() => {
  const { t } = useTranslation()

  const { chatsListData, chosenChatId, setChosenChatId } = useChatList()

  if (!chatsListData) {
    return (
      <div
        className={
          'w-full h-full flex justify-center flex-col gap-5 items-center px-2'
        }
      >
        <CircleLoader className={'pt-0'} />
      </div>
    )
  }

  if (chatsListData.items.length === 0) {
    return (
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
    )
  }

  return (
    <ScrollArea
      className={'h-full'}
      isPaddingRight={false}
    >
      {chatsListData.items.map((item) => (
        <ChatsListItem
          chosenChatId={chosenChatId}
          item={item}
          key={item.id}
          ownerMessagePrefixText={t.messenger.you}
          setChosenChatId={setChosenChatId}
        />
      ))}
    </ScrollArea>
  )
})

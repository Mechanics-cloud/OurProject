import { CircleLoader, ScrollArea } from '@/common'
import { observer } from 'mobx-react-lite'

import { useChatList } from '../../model/useChatList'
import { ChatsListItem } from './ChatsListItem'

export const ChatsList = observer(() => {
  const { chosenChatId, filteredChatList, setChosenChatId, text } =
    useChatList()

  if (!filteredChatList) {
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

  if (filteredChatList.length === 0) {
    return (
      <div
        className={
          'w-full h-full flex justify-center flex-col gap-5 items-center px-2'
        }
      >
        <span className={'text-pretty text-center'}>{text.noMessages}</span>
        <span className={'text-pretty text-center'}>
          {text.shouldUseSearch}
        </span>
      </div>
    )
  }

  return (
    <ScrollArea
      className={'h-full'}
      isPaddingRight={false}
    >
      {filteredChatList.map((item) => (
        <ChatsListItem
          chosenChatId={chosenChatId}
          item={item}
          key={item.id}
          setChosenChatId={setChosenChatId}
        />
      ))}
    </ScrollArea>
  )
})

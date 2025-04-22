import { Nullable, Typography, cn } from '@/common'
import { MessageDTO } from '@/features/messenger/api'
import { useChatsListItem } from '@/features/messenger/model/useChatsListItem'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'

import { ChatListItemWrapper } from './ChatListItemWrapper'

type Props = {
  chosenChatId: Nullable<number>
  className?: string
  item: MessageDTO
  ownerMessagePrefixText: string
  setChosenChatId: (partnerId: number) => void
}

export const ChatsListItem = observer(
  ({
    chosenChatId,
    className,
    item,
    ownerMessagePrefixText,
    setChosenChatId,
  }: Props) => {
    const {
      Component,
      avatar,
      createdDateAt,
      hasNewMessage,
      isChosen,
      isLoading,
      isPartnerMessage,
      messageText,
      userName,
      wrapperProps,
    } = useChatsListItem({
      chosenChatId,
      item,
      setChosenChatId,
    })

    return (
      <ChatListItemWrapper
        as={Component}
        className={cn(
          'flex w-full p-3 gap-3 border-b border-dark-300 transition-colors duration-500',
          isChosen
            ? 'bg-dark-100'
            : !isLoading && 'hover:bg-dark-100 cursor-pointer',
          isLoading && 'animate-pulse',
          className
        )}
        {...wrapperProps}
      >
        <div
          className={'h-12 aspect-square relative rounded-full overflow-hidden'}
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
              className={'truncate'}
              variant={'reg14'}
            >
              {userName}
            </Typography>
            <Typography variant={'small'}>{createdDateAt}</Typography>
          </div>
          <Typography
            className={cn(
              'truncate pr-6 relative',
              hasNewMessage &&
                'after:absolute after:w-2 after:h-2 after:bg-accent-300 after:right-1 after:rounded-full after:top-[15%]'
            )}
            variant={'small'}
          >
            {isPartnerMessage
              ? messageText
              : ownerMessagePrefixText + messageText}
          </Typography>
        </div>
      </ChatListItemWrapper>
    )
  }
)

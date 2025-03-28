import { Nullable, Typography, cn } from '@/common'
import Image from 'next/image'

import { Message } from '../../api'
import { useChatsListItem } from '../../model/useChatsListItem'
import { Wrapper } from './Wrapper'

type Props = {
  chosenChatId: Nullable<number>
  className?: string
  item: Message
  setChosenChatId: (partnerId: number) => void
}

export const ChatsListItem = ({
  chosenChatId,
  className,
  item,
  setChosenChatId,
}: Props) => {
  const {
    Component,
    avatar,
    createdDateAt,
    isChosen,
    isLoading,
    messageText,
    userName,
    wrapperProps,
  } = useChatsListItem({
    chosenChatId,
    item,
    setChosenChatId,
  })

  return (
    <Wrapper
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
        className={
          'h-[48px] aspect-square relative rounded-full overflow-hidden'
        }
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
            className={'whitespace-nowrap overflow-hidden text-ellipsis'}
            variant={'reg14'}
          >
            {userName}
          </Typography>
          <Typography variant={'small'}>{createdDateAt}</Typography>
        </div>
        <Typography
          className={'whitespace-nowrap overflow-hidden text-ellipsis'}
          variant={'small'}
        >
          {messageText}
        </Typography>
      </div>
    </Wrapper>
  )
}

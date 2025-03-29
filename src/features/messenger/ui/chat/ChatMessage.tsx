import { ElementRef, forwardRef } from 'react'

import { CheckmarkOutline, DoneAllOutline } from '@/assets/icons'
import avatarPlaceholder from '@/assets/images/user-avatar-placeholder.jpg'
import { Typography, cn, formatIsoDateToShortDate } from '@/common'
import { generalStore } from '@/core/store'
import { PartnerMessage } from '@/features/messenger/api'
import { messengerStore } from '@/features/messenger/model/stores/messengerStore'
import Image from 'next/image'

type Props = {
  isChosenMessage: boolean
  isMessageDelete: boolean
  locale: string
  message: PartnerMessage
  onChoseMessageToEdit: (messageId: number, messageText: string) => void
}
export const ChatMessage = forwardRef<ElementRef<'div'>, Props>(
  (
    { isChosenMessage, isMessageDelete, locale, message, onChoseMessageToEdit },
    ref
  ) => {
    const userId = generalStore.user?.userId
    const isPartnerMessage = userId === message.receiverId
    const dialogPartnerInfo = messengerStore.dialogPartnerInfo
    const avatar =
      dialogPartnerInfo && dialogPartnerInfo?.avatars.length !== 0
        ? dialogPartnerInfo?.avatars[1].url
        : avatarPlaceholder
    const createdAt = formatIsoDateToShortDate(message.createdAt, locale)
    const onClick = () => {
      if (isMessageDelete) {
        return
      }
      onChoseMessageToEdit(message.id, message.messageText)
    }
    const imageAlt = dialogPartnerInfo?.userName || 'partners avatar'

    return (
      <div
        className={cn(
          isPartnerMessage ? 'justify-start gap-3' : 'justify-end',
          ' w-full flex items-end'
        )}
        key={message.id}
        ref={ref}
      >
        {isPartnerMessage && (
          <Image
            alt={imageAlt}
            className={'rounded-full'}
            height={48}
            src={avatar}
            width={48}
          />
        )}
        <div
          className={cn(
            isPartnerMessage ? 'bg-dark-300' : 'bg-accent-900 cursor-pointer',
            isChosenMessage && 'bg-accent-300',
            isMessageDelete && 'animate-pulse cursor-auto',
            'rounded-lg py-[7px] px-3 flex flex-col items-end justify-center'
          )}
          onClick={onClick}
        >
          <Typography variant={'reg14'}>{message.messageText}</Typography>
          <Typography
            className={cn(
              isPartnerMessage ? 'text-light-900' : 'text-accent-100'
            )}
            variant={'small'}
          >
            {createdAt}
          </Typography>
          {!isPartnerMessage && message.status === 'READ' ? (
            <DoneAllOutline />
          ) : (
            <CheckmarkOutline />
          )}
        </div>
      </div>
    )
  }
)

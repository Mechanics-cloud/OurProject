import { ElementRef, forwardRef } from 'react'

import { CheckmarkOutline, DoneAllOutline } from '@/assets/icons'
import avatarPlaceholder from '@/assets/images/user-avatar-placeholder.jpg'
import { Typography, cn, formatIsoDateToShortDate } from '@/common'
import { generalStore } from '@/core/store'
import { PartnerMessage } from '@/features/messenger/api'
import { messengerStore } from '@/features/messenger/model/store/store'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { useRouter } from 'next/router'

type Props = {
  isMessageChosen: boolean
  isMessageDelete: boolean
  message: PartnerMessage
  messageEditedText: string
  onChoseMessageToEdit: (messageId: number, messageText: string) => void
}
const _ChatMessage = forwardRef<ElementRef<'div'>, Props>(
  (
    {
      isMessageChosen,
      isMessageDelete,
      message,
      messageEditedText,
      onChoseMessageToEdit,
    },
    ref
  ) => {
    const router = useRouter()
    const userId = generalStore.user?.userId
    const {
      createdAt: createdDate,
      id,
      messageText,
      receiverId,
      status,
      updatedAt: updatedDate,
    } = message
    const isPartnerMessage = userId === receiverId
    const dialogPartnerInfo = messengerStore.dialogPartnerInfo
    const avatar =
      dialogPartnerInfo && dialogPartnerInfo?.avatars.length !== 0
        ? dialogPartnerInfo?.avatars[1].url
        : avatarPlaceholder

    const actualMessageDate =
      createdDate === updatedDate ? createdDate : updatedDate

    const createdAt = formatIsoDateToShortDate(actualMessageDate, router.locale)
    const onClick = () => {
      if (isMessageDelete || isPartnerMessage) {
        return
      }
      onChoseMessageToEdit(id, messageText)
    }
    const imageAlt = dialogPartnerInfo?.userName || 'partners avatar'

    return (
      <div
        className={cn(
          isPartnerMessage ? 'justify-start gap-3' : 'justify-end',
          ' w-full flex items-end'
        )}
        key={id}
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
            isMessageChosen && 'bg-accent-300',
            isMessageDelete && isMessageChosen && 'animate-pulse cursor-auto',
            'rounded-lg py-[7px] px-3 flex flex-col items-end justify-center'
          )}
          onClick={onClick}
        >
          <Typography
            className={'break-all'}
            variant={'reg14'}
          >
            {messageText}
          </Typography>
          <div className={'flex gap-1'}>
            <Typography
              className={cn(
                isPartnerMessage ? 'text-light-900' : 'text-accent-100'
              )}
              variant={'small'}
            >
              {actualMessageDate === createdDate
                ? createdAt
                : `${messageEditedText} ${createdAt}`}
            </Typography>
            {!isPartnerMessage &&
              (status === 'READ' ? <DoneAllOutline /> : <CheckmarkOutline />)}
          </div>
        </div>
      </div>
    )
  }
)

export const ChatMessage = observer(_ChatMessage)

import { ElementType } from 'react'

import avatarPlaceholder from '@/assets/images/user-avatar-placeholder.jpg'
import { Nullable, ProtectedPaths, formatIsoDateToShortDate } from '@/common'
import { generalStore } from '@/core/store'
import { MessageDTO } from '@/features/messenger/api'
import { messengerStore } from '@/features/messenger/model/store/store'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const useChatsListItem = ({
  chosenChatId,
  item,
  setChosenChatId,
}: {
  chosenChatId: Nullable<number>
  item: MessageDTO
  setChosenChatId: (partnerId: number) => void
}) => {
  const router = useRouter()
  const userId = generalStore.user?.userId
  const setDialogPartnerInfo = messengerStore.setDialogPartnerInfo
  const isLoading = messengerStore.isLoading

  const { avatars, createdAt, messageText, ownerId, receiverId, userName } =
    item
  const createdDateAt = formatIsoDateToShortDate(createdAt, router.locale)
  const avatar = avatars.length === 0 ? avatarPlaceholder : avatars[1].url
  const partnerId = ownerId === userId ? receiverId : ownerId
  const isPartnerMessage = receiverId === userId
  const linkHref = {
    pathname: ProtectedPaths.messenger,
    query: { dialogPartnerId: partnerId },
  }
  const isChosen = chosenChatId === partnerId
  const isClickable = !isLoading && !isChosen

  const onGetPartnerMessages = () => {
    setChosenChatId(partnerId)
    setDialogPartnerInfo({
      avatars: avatars,
      partnerId,
      userName: userName,
    })
  }

  const wrapperProps = isClickable
    ? { href: linkHref, onClick: onGetPartnerMessages, shallow: true }
    : {}

  const Component: ElementType = isClickable ? Link : 'div'

  const hasNewMessage = messengerStore.hasNewMessage === ownerId

  return {
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
  }
}

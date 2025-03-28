import { ElementType } from 'react'

import avatarPlaceholder from '@/assets/images/user-avatar-placeholder.jpg'
import { Nullable, ProtectedPaths, formatIsoDateToShortDate } from '@/common'
import { generalStore } from '@/core/store'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Message } from '../api'
import { messengerStore } from './stores/messengerStore'

export const useChatsListItem = ({
  chosenChatId,
  item,
  setChosenChatId,
}: {
  chosenChatId: Nullable<number>
  item: Message
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

  return {
    Component,
    avatar,
    createdDateAt,
    isChosen,
    isLoading,
    messageText,
    userName,
    wrapperProps,
  }
}

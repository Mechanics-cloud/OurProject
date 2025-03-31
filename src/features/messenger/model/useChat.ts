import { useCallback, useEffect, useRef, useState } from 'react'

import { Nullable, useModal } from '@/common'
import { messengerStore } from '@/features/messenger/model/store/store'
import { useRouter } from 'next/router'

type ChosenMessage = {
  id: number
  message: string
}

export const useChat = () => {
  const router = useRouter()
  const dialogPartnerId = router.query.dialogPartnerId
    ? Number(router.query.dialogPartnerId)
    : undefined
  const { isModalOpen, onModalClose, openModal } = useModal()

  const dialogPartnerMessages = messengerStore.dialogPartnerMessages
  const deleteMessageByMessageId = messengerStore.deleteMessageByMessageId
  const getDialogPartnerMessagesById =
    messengerStore.getDialogPartnerMessagesById
  const isChatLoading = messengerStore.isChatLoading

  const loadMoreMessagesObserver = useRef<Nullable<IntersectionObserver>>(null)

  const [cursor, setCursor] = useState<number | undefined>()
  const [isLoadMoreMessages, setIsLoadMoreMessages] = useState<boolean>(false)
  const [isNoMoreMessages, setIsNoMoreMessages] = useState<boolean>(false)
  const [chosenMessages, setChosenMessages] = useState<ChosenMessage[]>([])
  const [isMessageEdit, setIsMessageEdit] = useState<boolean>(false)
  const [isMessageDelete, setIsMessageDelete] = useState<boolean>(false)

  useEffect(() => {
    setChosenMessages([])
    setIsMessageEdit(false)
    setCursor(undefined)
    setIsNoMoreMessages(false)
  }, [dialogPartnerId])

  useEffect(() => {
    const controller = new AbortController()

    const fetchMessages = async () => {
      setIsLoadMoreMessages(true)
      await getDialogPartnerMessagesById({
        cursor,
        dialogPartnerId,
        signal: controller.signal,
      })
      setIsLoadMoreMessages(false)
    }

    fetchMessages()

    return () => {
      controller.abort()
    }
  }, [getDialogPartnerMessagesById, dialogPartnerId, cursor])

  const lastMessageRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoadMoreMessages) {
        return
      }
      if (loadMoreMessagesObserver.current) {
        loadMoreMessagesObserver.current.disconnect()
      }

      loadMoreMessagesObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const totalCount =
            messengerStore.dialogPartnerMessages?.totalCount ?? 0
          const currentLength =
            messengerStore.dialogPartnerMessages?.items.length ?? 0
          const hasMore = currentLength < totalCount

          if (hasMore) {
            const cursor =
              messengerStore.dialogPartnerMessages?.items.at(-1)?.id

            setCursor(cursor)
          } else {
            setIsNoMoreMessages(true)
          }
        }
      })

      if (node) {
        loadMoreMessagesObserver.current.observe(node)
      }
    },
    [isLoadMoreMessages]
  )

  const onDeleteMessageById = async () => {
    const idsArray = chosenMessages.map((el) => el.id)

    setIsMessageDelete(true)
    onModalClose()
    await deleteMessageByMessageId(idsArray)
    setChosenMessages([])
    setIsMessageDelete(false)
  }

  const onRefreshEdit = () => {
    setIsMessageEdit(false)

    // второй вызов нужен в зависимости нужно ли зачистить стейт выбранных сообщений в chosenMessages
    // этот вызов исполняется в ChatInput
    return () => setChosenMessages([])
  }

  const onChoseMessageToEdit = (messageId: number, messageText: string) => {
    if (isMessageEdit || isMessageDelete) {
      return
    }
    setChosenMessages((prev) => {
      const containIndex = prev.findIndex((el) => el.id === messageId)

      if (containIndex !== -1) {
        return prev.toSpliced(containIndex, 1)
      }

      return [
        ...prev,
        {
          id: messageId,
          message: messageText,
        },
      ]
    })
  }

  const onIsEditMessage = () => {
    setIsMessageEdit(true)
  }

  return {
    chosenMessages,
    dialogPartnerMessages,
    isChatLoading,
    isLoadMoreMessages,
    isMessageDelete,
    isMessageEdit,
    isModalOpen,
    isNoMoreMessages,
    lastMessageRef,
    onChoseMessageToEdit,
    onDeleteMessageById,
    onIsEditMessage,
    onModalClose,
    onRefreshEdit,
    openModal,
  }
}

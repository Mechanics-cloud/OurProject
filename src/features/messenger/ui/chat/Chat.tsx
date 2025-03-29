import { useCallback, useEffect, useRef, useState } from 'react'

import {
  Button,
  CircleLoader,
  Nullable,
  Typography,
  cn,
  useModal,
  useTranslation,
} from '@/common'
import { generalStore } from '@/core/store'
import { ChatInput } from '@/features/messenger/ui/chat/ChatInput'
import { ChatMessage } from '@/features/messenger/ui/chat/ChatMessage'
import { DeleteMessageModal } from '@/features/messenger/ui/chat/DeleteMessageModal'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

import { messengerStore } from '../../model/stores/messengerStore'

type ChosenMessage = {
  id: number
  isDelete: boolean
  message: string
}

export const Chat = observer(() => {
  const { t } = useTranslation()
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

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const observer = useRef<Nullable<IntersectionObserver>>(null)

  const [cursor, setCursor] = useState<number | undefined>()
  const [isMessageLoading, setIsMessageLoading] = useState<boolean>(false)
  const [isNoMoreMessages, setIsNoMoreMessages] = useState<boolean>(false)
  const [chosenMessages, setChosenMessages] = useState<ChosenMessage[]>([])
  const [isEditMessage, setIsEditMessage] = useState<boolean>(false)
  const [isDeleteMessage, setIsDeleteMessage] = useState<boolean>(false)

  useEffect(() => {
    setChosenMessages([])
    setIsMessageLoading(false)
    setIsNoMoreMessages(false)
    setIsEditMessage(false)
    setIsDeleteMessage(false)
  }, [isChatLoading])

  useEffect(() => {
    setCursor(undefined)
    setIsNoMoreMessages(false)
    // if (messagesEndRef.current) {
    //   messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    // }
  }, [dialogPartnerId])

  useEffect(() => {
    const controller = new AbortController()

    const fetchMessages = async () => {
      setIsMessageLoading(true)
      await getDialogPartnerMessagesById({
        cursor,
        dialogPartnerId,
        signal: controller.signal,
      })
      setIsMessageLoading(false)
    }

    fetchMessages()

    return () => {
      controller.abort()
    }
  }, [getDialogPartnerMessagesById, dialogPartnerId, cursor, isChatLoading])

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isMessageLoading) {
        return
      }
      if (observer.current) {
        observer.current.disconnect()
      }

      observer.current = new IntersectionObserver((entries) => {
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
        observer.current.observe(node)
      }
    },
    [isMessageLoading]
  )

  const onDeleteMessageById = async () => {
    const idsArray = chosenMessages.map((el) => el.id)

    setIsDeleteMessage(true)
    setChosenMessages((prev) => {
      return prev.map((el) =>
        idsArray.includes(el.id) ? { ...el, isDelete: true } : el
      )
    })
    onModalClose()
    await deleteMessageByMessageId(idsArray)
    setChosenMessages([])
    setIsDeleteMessage(false)
  }

  const onRefreshEdit = () => {
    setIsEditMessage(false)

    return () => setChosenMessages([]) // второй вызов нужен в зависимости нужно ли зачистить стейт выбранных сообщений в chosenMessages
  }

  const onChoseMessageToEdit = (messageId: number, messageText: string) => {
    if (isEditMessage || isDeleteMessage) {
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
          isDelete: false,
          message: messageText,
        },
      ]
    })
  }

  const onIsEditMessage = () => {
    setIsEditMessage(true)
  }

  if (isChatLoading) {
    return <CircleLoader className={'pt-0'} />
  }

  return dialogPartnerMessages ? (
    <div
      className={
        'w-full h-full flex flex-col items-center justify-end relative'
      }
    >
      {!!chosenMessages.length && (
        <div
          className={
            'absolute w-full top-0 flex items-center justify-end bg-dark-500 p-3 gap-2 z-10'
          }
        >
          {chosenMessages.length === 1 && (
            <Button
              disabled={isEditMessage || isDeleteMessage}
              onClick={onIsEditMessage}
            >
              {t.messenger.change}
            </Button>
          )}
          <Button
            disabled={isEditMessage || isDeleteMessage}
            onClick={openModal}
          >
            {t.messenger.delete}
          </Button>
        </div>
      )}
      <div
        className={
          'flex flex-col-reverse gap-5 py-5 px-2 overflow-y-auto w-full h-full'
        }
        // ref={messagesEndRef}
        style={{ scrollbarGutter: 'stable both-edges' }}
      >
        {dialogPartnerMessages.items.map((message, index, partnerMessages) => {
          const chosenMessage = chosenMessages.find(
            (el) => el.id === message.id
          )
          const lastMessageRef =
            index === partnerMessages.length - 1 ? lastPostElementRef : null

          return (
            <ChatMessage
              isChosenMessage={!!chosenMessage}
              isMessageDelete={!!chosenMessage?.isDelete}
              key={message.id}
              locale={router.locale || ''}
              message={message}
              onChoseMessageToEdit={onChoseMessageToEdit}
              ref={lastMessageRef}
            />
          )
        })}
        {(isMessageLoading || isNoMoreMessages) && (
          <div className={'w-full flex flex-col items-center justify-center'}>
            <Typography className={cn(!isNoMoreMessages && 'animate-pulse')}>
              {isNoMoreMessages ? t.messenger.noMoreMessages : t.basic.loading}
            </Typography>
          </div>
        )}
      </div>
      <ChatInput
        chosenMessageId={chosenMessages[0] && chosenMessages[0].id}
        chosenMessageText={chosenMessages[0] && chosenMessages[0].message}
        isEditMessage={isEditMessage}
        onRefreshEdit={onRefreshEdit}
        placeholder={t.messenger.typeMessage}
      />
      <DeleteMessageModal
        chosenMessagesCount={chosenMessages.length}
        isModalOpen={isModalOpen}
        onDeleteMessageById={onDeleteMessageById}
        onModalClose={onModalClose}
      />
    </div>
  ) : (
    <span className={'text-gray-400 text-pretty text-center'}>
      {t.messenger.chooseChatUser}
    </span>
  )
})

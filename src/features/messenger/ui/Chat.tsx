import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'

import {
  CheckmarkOutline,
  Close,
  DoneAllOutline,
  PaperPlaneOutline,
} from '@/assets/icons'
import avatarPlaceholder from '@/assets/images/user-avatar-placeholder.jpg'
import {
  Button,
  CircleLoader,
  Nullable,
  SimpleModal,
  Typography,
  cn,
  formatIsoDateToShortDate,
  getTextAreaClasses,
  useModal,
  useTranslation,
} from '@/common'
import { generalStore } from '@/core/store'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { messengerStore } from '../model/stores/messengerStore'

type ChosenMessage = {
  id: number
  isDelete: boolean
  message: string
}

export const Chat = observer(() => {
  const dialogPartnerMessages = messengerStore.dialogPartnerMessages
  const deleteMessageByMessageId = messengerStore.deleteMessageByMessageId
  const isChatLoading = messengerStore.isChatLoading
  const updateWSMessage = messengerStore.updateWSMessage
  const dialogPartnerInfo = messengerStore.dialogPartnerInfo
  const sendMessageWS = messengerStore.sendWSMessage
  const { t } = useTranslation()
  const userId = generalStore.user?.userId
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textFieldRef = useRef<HTMLTextAreaElement>(null)
  const { isModalOpen, onModalClose, openModal } = useModal()

  const router = useRouter()
  const dialogPartnerId = router.query.dialogPartnerId
    ? Number(router.query.dialogPartnerId)
    : undefined

  const getDialogPartnerMessagesById =
    messengerStore.getDialogPartnerMessagesById
  const observer = useRef<Nullable<IntersectionObserver>>(null)
  const [cursor, setCursor] = useState<number | undefined>()
  const [textAreaMessage, setTextAreaMessage] = useState<string>('')
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
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }
  }, [dialogPartnerId])

  useEffect(() => {
    const controller = new AbortController()

    const fetchMessages = async () => {
      setIsMessageLoading(true)
      await getDialogPartnerMessagesById({
        cursor,
        dialogPartnerId,
      })
      setIsMessageLoading(false)
    }

    fetchMessages()

    return () => {
      controller.abort()
    }
  }, [getDialogPartnerMessagesById, dialogPartnerId, cursor])

  useEffect(() => {
    if (textFieldRef.current) {
      textFieldRef.current.style.height = '0px'
      const scrollHeight = textFieldRef.current.scrollHeight

      textFieldRef.current.style.height = scrollHeight + 'px'
    }
  }, [textFieldRef, textAreaMessage])

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

  const avatar =
    dialogPartnerInfo && dialogPartnerInfo?.avatars.length !== 0
      ? dialogPartnerInfo?.avatars[1].url
      : avatarPlaceholder

  const onSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isEditMessage) {
      updateWSMessage(textAreaMessage, chosenMessages[0].id)
      setTextAreaMessage('')
      setIsEditMessage(false)
      setChosenMessages([])

      return
    }

    if (!textAreaMessage.trim()) {
      return
    }
    sendMessageWS(textAreaMessage.trim(), dialogPartnerInfo!.partnerId)
    setTextAreaMessage('')
  }

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

  const Chat = dialogPartnerMessages ? (
    <div className={'w-full h-full flex flex-col items-center justify-end '}>
      <div
        className={
          'flex flex-col-reverse gap-5 py-5 px-2 overflow-y-auto w-full h-full'
        }
        ref={messagesEndRef}
        style={{ scrollbarGutter: 'stable both-edges' }}
      >
        {dialogPartnerMessages.items.map((message, index) => {
          const isPartnerMessage = userId === message.receiverId
          const createdAt = formatIsoDateToShortDate(
            message.createdAt,
            router.locale
          )
          const isChosenMessage = chosenMessages.find(
            (el) => el.id === message.id
          )

          return (
            <div
              className={cn(
                isPartnerMessage ? 'justify-start gap-3' : 'justify-end',
                ' w-full flex items-end'
              )}
              key={message.id}
              ref={
                index === dialogPartnerMessages.items.length - 1
                  ? lastPostElementRef
                  : null
              }
            >
              {isPartnerMessage && (
                <Image
                  alt={dialogPartnerInfo?.userName || 'partners avatar'}
                  className={'rounded-full'}
                  height={48}
                  src={avatar}
                  width={48}
                />
              )}
              <div
                className={cn(
                  isPartnerMessage
                    ? 'bg-dark-300'
                    : 'bg-accent-900 cursor-pointer',
                  isChosenMessage && 'bg-accent-300',
                  isChosenMessage?.isDelete && 'animate-pulse',
                  'rounded-lg py-[7px] px-3 flex flex-col items-end justify-center'
                )}
                onClick={() => {
                  if (isEditMessage || isDeleteMessage) {
                    return
                  }
                  setChosenMessages((prev) => {
                    const containIndex = prev.findIndex(
                      (el) => el.id === message.id
                    )

                    if (containIndex !== -1) {
                      return prev.toSpliced(containIndex, 1)
                    }

                    return [
                      ...prev,
                      {
                        id: message.id,
                        isDelete: false,
                        message: message.messageText,
                      },
                    ]
                  })
                }}
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
                {!isPartnerMessage &&
                  (message.status === 'READ' ? (
                    <DoneAllOutline />
                  ) : (
                    <CheckmarkOutline />
                  ))}
              </div>
            </div>
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
      <form
        className={'flex w-full relative'}
        onSubmit={onSendMessage}
      >
        {isEditMessage ? (
          <div className={'absolute -top-9 w-full h-9 bg-accent-300 '}>
            <div
              className={
                'flex items-center justify-between w-full h-full relative'
              }
            >
              <Typography
                className={
                  'whitespace-nowrap overflow-hidden text-ellipsis px-3'
                }
              >
                {chosenMessages[0].message}
              </Typography>
              <Button
                className={
                  'h-full flex justify-center items-center text-light-100 py-0 px-3'
                }
                onClick={() => {
                  setIsEditMessage(false)
                  setTextAreaMessage('')
                }}
                variant={'text'}
              >
                <Close />
              </Button>
            </div>
          </div>
        ) : null}
        <textarea
          className={cn(getTextAreaClasses(false), 'resize-none max-h-[108px]')}
          onChange={(e) => setTextAreaMessage(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              e.currentTarget.form?.requestSubmit()
            }
          }}
          placeholder={t.messenger.typeMessage}
          ref={textFieldRef}
          rows={1}
          value={textAreaMessage}
        />
        <Button
          className={
            'h-full flex justify-center items-center text-light-100 py-0 px-3'
          }
          disabled={!textAreaMessage.trim()}
          variant={'text'}
        >
          <PaperPlaneOutline />
        </Button>
      </form>
    </div>
  ) : (
    <span className={'text-gray-400 text-pretty text-center'}>
      {t.messenger.chooseChatUser}
    </span>
  )

  return (
    <div
      className={
        'col-span-1 row-span-1 flex items-center justify-center relative'
      }
    >
      {chosenMessages.length ? (
        <div
          className={
            'absolute w-full top-0 flex items-center justify-end bg-dark-500 p-3 gap-2'
          }
        >
          {chosenMessages.length === 1 ? (
            <Button
              disabled={isEditMessage || isDeleteMessage}
              onClick={() => {
                setIsEditMessage(true)
                setTextAreaMessage(chosenMessages[0].message)
                textFieldRef.current?.focus()
              }}
            >
              {t.messenger.change}
            </Button>
          ) : null}
          <Button
            disabled={isEditMessage || isDeleteMessage}
            onClick={openModal}
          >
            {t.messenger.delete}
          </Button>
        </div>
      ) : null}
      {isChatLoading ? <CircleLoader className={'pt-0'} /> : Chat}
      <SimpleModal
        className={'w-40'}
        onOpenChange={onModalClose}
        open={isModalOpen}
        title={t.messenger.delete}
      >
        <div
          className={
            'w-full h-full flex flex-col items-center justify-center pt-2 pb-6 px-4 gap-7'
          }
        >
          <Typography variant={'bold16'}>
            {t.messenger.deleteConfirm(chosenMessages.length)}
          </Typography>
          <div className={'flex items-center justify-end w-full h-full gap-6'}>
            <Button
              onClick={onDeleteMessageById}
              variant={'outline'}
            >
              {t.basic.yes}
            </Button>
            <Button onClick={onModalClose}>{t.basic.no}</Button>
          </div>
        </div>
      </SimpleModal>
    </div>
  )
})

import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  CheckmarkOutline,
  DoneAllOutline,
  PaperPlaneOutline,
} from '@/assets/icons'
import avatarPlaceholder from '@/assets/images/user-avatar-placeholder.jpg'
import { Button, Nullable, Typography, cn, useTranslation } from '@/common'
import { getTextAreaClasses } from '@/common/components/textarea/helper'
import { formatIsoDateToShortDate } from '@/common/utils/formateChatDate'
import { generalStore } from '@/core/store'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { messengerStore } from '../model/stores/messengerStore'

export const Chat = observer(() => {
  const dialogPartnerMessages = messengerStore.dialogPartnerMessages
  const dialogPartnerInfo = messengerStore.dialogPartnerInfo
  const sendMessageWS = messengerStore.sendWSMessage
  const { t } = useTranslation()
  const userId = generalStore.user?.userId
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [message, setMessage] = useState<string>('')

  const router = useRouter()
  const dialogPartnerId = router.query.dialogPartnerId
    ? Number(router.query.dialogPartnerId)
    : null

  const getDialogPartnerMessagesById =
    messengerStore.getDialogPartnerMessagesById
  const observer = useRef<Nullable<IntersectionObserver>>(null)
  const [cursor, setCursor] = useState<number | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isNoMoreMessages, setIsNoMoreMessages] = useState<boolean>(false)

  useEffect(() => {
    setCursor(undefined)
    setIsNoMoreMessages(false)
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }
  }, [dialogPartnerId])

  useEffect(() => {
    const controller = new AbortController()

    if (dialogPartnerId) {
      const fetchMessages = async () => {
        setIsLoading(true)
        await getDialogPartnerMessagesById({
          cursor,
          dialogPartnerId,
        })
        setIsLoading(false)
      }

      fetchMessages()
    }

    return () => {
      controller.abort()
    }
  }, [getDialogPartnerMessagesById, dialogPartnerId, cursor])

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) {
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
    [isLoading]
  )

  const avatar =
    dialogPartnerInfo && dialogPartnerInfo?.avatars.length !== 0
      ? dialogPartnerInfo?.avatars[1].url
      : avatarPlaceholder

  const onSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message.trim()) {
      return
    }
    sendMessageWS(message.trim(), dialogPartnerInfo!.partnerId)
    setMessage('')
  }

  return (
    <div className={'col-span-1 row-span-1 flex items-center justify-center'}>
      {dialogPartnerMessages ? (
        <div
          className={'w-full h-full flex flex-col items-center justify-end '}
        >
          <div
            className={
              'flex flex-col-reverse justify-between gap-5 py-5 overflow-y-auto w-full h-full'
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
                      isPartnerMessage ? 'bg-dark-300' : 'bg-accent-900',
                      'rounded-lg py-[7px] px-3 flex flex-col items-end justify-center'
                    )}
                  >
                    <Typography variant={'reg14'}>
                      {message.messageText}
                    </Typography>
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
            {(isLoading || isNoMoreMessages) && (
              <div
                className={'w-full flex flex-col items-center justify-center'}
              >
                <Typography
                  className={cn(!isNoMoreMessages && 'animate-pulse')}
                >
                  {isNoMoreMessages
                    ? t.messenger.noMoreMessages
                    : t.basic.loading}
                </Typography>
              </div>
            )}
          </div>
          <form
            className={'flex w-full'}
            onSubmit={onSendMessage}
          >
            <textarea
              className={cn(getTextAreaClasses(false), 'resize-none')}
              onChange={(e) => setMessage(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  e.currentTarget.form?.requestSubmit()
                }
              }}
              placeholder={t.messenger.typeMessage}
              rows={1}
              value={message}
            />
            <Button
              className={
                'h-full flex justify-center items-center text-light-100 py-0 px-3'
              }
              disabled={!message.trim()}
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
      )}
    </div>
  )
})

import React, { FormEvent, useEffect, useRef, useState } from 'react'

import {
  CheckmarkOutline,
  DoneAllOutline,
  PaperPlaneOutline,
} from '@/assets/icons'
import avatarPlaceholder from '@/assets/images/user-avatar-placeholder.jpg'
import { Button, Typography, cn, useTranslation } from '@/common'
import { getTextAreaClasses } from '@/common/components/textarea/helper'
import { formatIsoDateToShortDate } from '@/common/utils/formateChatDate'
import { generalStore } from '@/core/store'
import { messengerStore } from '@/features/messenger/model/stores/messengerStore'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const Chat = observer(() => {
  const dialogPartnerMessages = messengerStore.dialogPartnerMessages
  const dialogPartnerInfo = messengerStore.dialogPartnerInfo
  const sendMessageWS = messengerStore.sendWSMessage
  const { t } = useTranslation()
  const userId = generalStore.user?.userId
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [message, setMessage] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }
  }, [])

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
              'flex flex-col-reverse gap-5 py-5 overflow-y-auto w-full'
            }
            ref={messagesEndRef}
            style={{ scrollbarGutter: 'stable both-edges' }}
          >
            {dialogPartnerMessages.items.map((message) => {
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

// import React, { useEffect, useRef, useState } from 'react'
//
// export const Chat = () => {
//   const [messages, setMessages] = useState([
//     'Сообщение 1',
//     'Сообщение 2',
//     'Сообщение 3',
//     'Сообщение 4',
//     'Сообщение 5',
//     'Сообщение 5',
//     'Сообщение 5',
//     'Сообщение 5',
//     'Сообщение 5',
//     'Сообщение 5',
//     'Сообщение 5',
//     'Сообщение 5',
//     'Сообщение 5',
//     'Сообщение 5',
//     'Сообщение 5',
//     'Сообщение 5',
//     'Сообщение 5',
//     'Сообщение 5',
//   ])
//
//   const chatRef = useRef<HTMLDivElement | null>(null)
//
//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight
//     }
//   }, []) // Скролл только при первом рендере
//
//   const addMessage = () => {
//     setMessages((prev) => [`Новое сообщение ${prev.length + 1}`, ...prev]) // Добавляем в начало массива
//   }
//
//   return (
//     <div>
//       <button onClick={addMessage}>Добавить сообщение</button>
//       <div
//         ref={chatRef}
//         style={{
//           border: '1px solid black',
//           display: 'flex',
//           flexDirection: 'column-reverse', // Инвертируем порядок рендера
//           height: '200px',
//           overflowY: 'auto',
//           padding: '10px',
//         }}
//       >
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             style={{ borderBottom: '1px solid #ddd', padding: '5px' }}
//           >
//             {msg}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

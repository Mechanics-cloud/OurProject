import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react'

import { Close, PaperPlaneOutline } from '@/assets/icons'
import { Button, Typography, cn, getTextAreaClasses } from '@/common'

import { messengerStore } from '../../model/stores/messengerStore'

type ChosenMessage = {
  id: number
  isDelete: boolean
  message: string
}

type Props = {
  chosenMessageId?: number
  chosenMessageText?: string
  isEditMessage: boolean
  onRefreshEdit: () => () => void
  placeholder: string
}
export const ChatInput = ({
  chosenMessageId,
  chosenMessageText,
  isEditMessage,
  onRefreshEdit,
  placeholder,
}: Props) => {
  const [textAreaMessage, setTextAreaMessage] = useState<string>('')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const updateWSMessage = messengerStore.updateWSMessage
  const sendMessageWS = messengerStore.sendWSMessage
  const dialogPartnerInfo = messengerStore.dialogPartnerInfo

  const onTextAreaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      e.currentTarget.form?.requestSubmit()
    }
  }

  const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setTextAreaMessage(e.currentTarget.value)

  const onCancelEditMessage = () => {
    onRefreshEdit() // здесь нужно только отменить редактирование
    setTextAreaMessage('')
  }

  const onSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isEditMessage && chosenMessageId) {
      updateWSMessage(textAreaMessage, chosenMessageId)
      setTextAreaMessage('')
      const cleanChosenMessages = onRefreshEdit() // здесь нужно, в том числе зачистить стейт сообщений

      cleanChosenMessages() // зачистка chosenMessages

      return
    }

    if (!textAreaMessage.trim()) {
      return
    }
    sendMessageWS(textAreaMessage.trim(), dialogPartnerInfo!.partnerId)
    setTextAreaMessage('')
  }

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0px'
      const scrollHeight = textAreaRef.current.scrollHeight

      textAreaRef.current.style.height = scrollHeight + 'px'
    }
  }, [textAreaRef, textAreaMessage])

  useEffect(() => {
    if (isEditMessage && chosenMessageText) {
      setTextAreaMessage(chosenMessageText)
    }
    setTimeout(() => {
      textAreaRef.current?.focus()
    }, 0)
  }, [chosenMessageText, isEditMessage])

  return (
    <form
      className={'flex w-full relative'}
      onSubmit={onSendMessage}
    >
      {isEditMessage && (
        <div className={'absolute -top-9 w-full h-9 bg-accent-300 '}>
          <div
            className={
              'flex items-center justify-between w-full h-full relative'
            }
          >
            <Typography
              className={'whitespace-nowrap overflow-hidden text-ellipsis px-3'}
            >
              {chosenMessageText}
            </Typography>
            <Button
              className={
                'h-full flex justify-center items-center text-light-100 py-0 px-3'
              }
              onClick={onCancelEditMessage}
              variant={'text'}
            >
              <Close />
            </Button>
          </div>
        </div>
      )}
      <textarea
        className={cn(getTextAreaClasses(false), 'resize-none max-h-[108px]')}
        onChange={onTextAreaChange}
        onKeyDown={onTextAreaKeyDown}
        placeholder={placeholder}
        ref={textAreaRef}
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
  )
}

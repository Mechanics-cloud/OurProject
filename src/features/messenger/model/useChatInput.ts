import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react'

import { messengerStore } from '@/features/messenger/model/store/store'

type Props = {
  chosenMessageId?: number
  chosenMessageText?: string
  isEditMessage: boolean
  onRefreshEdit: () => () => void
}

export const useChatInput = ({
  chosenMessageId,
  chosenMessageText,
  isEditMessage,
  onRefreshEdit,
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

      cleanChosenMessages() // зачистка стейта chosenMessages

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

  return {
    onCancelEditMessage,
    onSendMessage,
    onTextAreaChange,
    onTextAreaKeyDown,
    textAreaMessage,
    textAreaRef,
  }
}

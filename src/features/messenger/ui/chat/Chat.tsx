import { Button, CircleLoader, Typography, cn, useTranslation } from '@/common'
import { useChat } from '@/features/messenger/model/useChat'
import { ChatInput } from '@/features/messenger/ui/chat/ChatInput'
import { ChatMessage } from '@/features/messenger/ui/chat/ChatMessage'
import { DeleteMessageModal } from '@/features/messenger/ui/chat/DeleteMessageModal'
import { observer } from 'mobx-react-lite'

export const Chat = observer(() => {
  const { t } = useTranslation()

  const {
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
  } = useChat()

  if (isChatLoading) {
    return <CircleLoader className={'pt-0'} />
  }

  if (!dialogPartnerMessages) {
    return (
      <span className={'text-gray-400 text-pretty text-center'}>
        {t.messenger.chooseChatUser}
      </span>
    )
  }

  return (
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
              disabled={isMessageEdit || isMessageDelete}
              onClick={onIsEditMessage}
            >
              {t.messenger.change}
            </Button>
          )}
          <Button
            disabled={isMessageEdit || isMessageDelete}
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
        style={{ scrollbarGutter: 'stable both-edges' }}
      >
        {dialogPartnerMessages.items.map((message, index, partnerMessages) => {
          const chosenMessage = chosenMessages.find(
            (el) => el.id === message.id
          )
          const ref =
            index === partnerMessages.length - 1 ? lastMessageRef : null

          return (
            <ChatMessage
              isMessageChosen={!!chosenMessage}
              isMessageDelete={isMessageEdit || isMessageDelete}
              key={message.id}
              message={message}
              messageEditedText={t.messenger.messageEdited}
              onChoseMessageToEdit={onChoseMessageToEdit}
              ref={ref}
            />
          )
        })}
        {(isLoadMoreMessages || isNoMoreMessages) && (
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
        isEditMessage={isMessageEdit}
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
  )
})

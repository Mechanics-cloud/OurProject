import { Close, PaperPlaneOutline } from '@/assets/icons'
import { Button, Typography, cn, getTextAreaClasses } from '@/common'
import { useChatInput } from '@/features/messenger/model/useChatInput'
import { observer } from 'mobx-react-lite'

type Props = {
  chosenMessageId?: number
  chosenMessageText?: string
  isEditMessage: boolean
  onRefreshEdit: () => () => void
  placeholder: string
}
export const ChatInput = observer(
  ({
    chosenMessageId,
    chosenMessageText,
    isEditMessage,
    onRefreshEdit,
    placeholder,
  }: Props) => {
    const {
      onCancelEditMessage,
      onSendMessage,
      onTextAreaChange,
      onTextAreaKeyDown,
      textAreaMessage,
      textAreaRef,
    } = useChatInput({
      chosenMessageId,
      chosenMessageText,
      isEditMessage,
      onRefreshEdit,
    })

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
                className={
                  'whitespace-nowrap overflow-hidden text-ellipsis px-3'
                }
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
)

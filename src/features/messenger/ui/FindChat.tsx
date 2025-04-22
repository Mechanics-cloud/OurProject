import { TextField } from '@/common'
import { useFindChat } from '@/features/messenger/model/useFindChat'
import { observer } from 'mobx-react-lite'

export const FindChat = observer(() => {
  const { inputText, onFindChat, searchPlaceholder } = useFindChat()

  return (
    <TextField
      bottomMarginForError={false}
      className={'w-full'}
      label={''}
      onChange={onFindChat}
      placeholder={searchPlaceholder}
      type={'search'}
      value={inputText}
    />
  )
})

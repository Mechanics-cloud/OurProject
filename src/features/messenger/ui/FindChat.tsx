import { TextField } from '@/common'
import { useFindChat } from '@/features/messenger/model/useFindChat'
import { observer } from 'mobx-react-lite'

export const FindChat = observer(() => {
  const { inputText, onFindChat, searchPlaceholder } = useFindChat()

  return (
    <TextField
      bottomMarginForError={false}
      label={''}
      onChange={onFindChat}
      placeholder={searchPlaceholder}
      type={'search'}
      value={inputText}
    />
  )
})

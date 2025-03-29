import { TextField } from '@/common'
import { observer } from 'mobx-react-lite'

import { useFindChat } from '../model/useFindChat'

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

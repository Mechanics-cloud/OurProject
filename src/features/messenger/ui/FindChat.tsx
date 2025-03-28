import { TextField } from '@/common'
import { observer } from 'mobx-react-lite'

import { useFindChat } from '../model/useFindChat'

export const FindChat = observer(() => {
  const { inputText, onFindChat, searchPlaceholder } = useFindChat()

  return (
    <div
      className={
        'px-3 col-span-1 row-span-1 border-r border-b border-dark-300 bg-dark-500 flex items-center'
      }
    >
      <TextField
        bottomMarginForError={false}
        label={''}
        onChange={onFindChat}
        placeholder={searchPlaceholder}
        type={'search'}
        value={inputText}
      />
    </div>
  )
})

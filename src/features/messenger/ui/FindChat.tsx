import { ChangeEvent, useEffect, useState } from 'react'

import { TextField, useDebounce, useTranslation } from '@/common'
import { messengerStore } from '@/features/messenger/model/stores/messengerStore'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'

export const FindChat = observer(() => {
  const [inputText, setInputText] = useState('')
  const { t } = useTranslation()
  const debounceValue = useDebounce(inputText)

  const onFindChat = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value)
  }

  useEffect(() => {
    runInAction(() => {
      messengerStore.searchName = debounceValue
    })
  }, [debounceValue])

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
        placeholder={t.messenger.searchPlaceholder}
        type={'search'}
        value={inputText}
      />
    </div>
  )
})

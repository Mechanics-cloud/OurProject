import { ChangeEvent, useEffect, useState } from 'react'

import { useDebounce, useTranslation } from '@/common'

import { messengerStore } from './stores/messengerStore'

export const useFindChat = () => {
  const [inputText, setInputText] = useState('')
  const { t } = useTranslation()
  const debounceValue = useDebounce(inputText)
  const setSearchName = messengerStore.setSearchName

  const onFindChat = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value)
  }

  useEffect(() => {
    setSearchName(debounceValue)
  }, [debounceValue, setSearchName])

  return {
    inputText,
    onFindChat,
    searchPlaceholder: t.messenger.searchPlaceholder,
  }
}

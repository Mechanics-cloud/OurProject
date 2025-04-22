import { useEffect } from 'react'

import { messengerStore } from '@/features/messenger/model/store/store'

export const useMessenger = () => {
  const getMessengerData = messengerStore.getMessengerData
  const clearMessengerStore = messengerStore.clearMessengerStore
  const searchName = messengerStore.searchName

  useEffect(() => {
    const controller = new AbortController()

    getMessengerData({ searchName, signal: controller.signal })

    return () => {
      controller.abort()
    }
  }, [getMessengerData, searchName])

  useEffect(() => {
    return () => {
      clearMessengerStore()
    }
  }, [clearMessengerStore])
}

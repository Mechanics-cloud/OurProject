import { useEffect } from 'react'

import { messengerStore } from './stores/messengerStore'

export const useMessenger = () => {
  const getMessengerData = messengerStore.getMessengerData
  const clearMessengerStore = messengerStore.clearMessengerStore

  useEffect(() => {
    const controller = new AbortController()

    getMessengerData({ signal: controller.signal })

    return () => {
      clearMessengerStore()
      controller.abort()
    }
  }, [clearMessengerStore, getMessengerData])
}

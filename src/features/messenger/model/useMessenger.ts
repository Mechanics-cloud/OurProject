import { useEffect } from 'react'

import { messengerStore } from '../model/stores/messengerStore'

export const useMessenger = () => {
  const getMessengerData = messengerStore.getMessengerData

  useEffect(() => {
    const controller = new AbortController()

    getMessengerData({ signal: controller.signal })

    return () => {
      controller.abort()
    }
  }, [getMessengerData])
}

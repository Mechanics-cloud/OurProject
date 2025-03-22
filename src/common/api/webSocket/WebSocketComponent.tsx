import { useEffect } from 'react'

import { WebSocketApi } from '@/common/api'

export const WebSocketComponent = () => {
  useEffect(() => {
    WebSocketApi.connectWS()

    return () => {
      WebSocketApi.disconnect()
    }
  }, [])

  return null
}

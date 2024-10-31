import { useCallback, useEffect } from 'react'

import { responseErrorHandler } from '@/common'
import { profileSessionsStore } from '@/features/profile/settings/devices/model/profileSessionsStore'

export const useDevices = () => {
  const currentSession = profileSessionsStore.currentSession

  const onLogoutDeviceClick = useCallback(async (deviceId: number) => {
    await profileSessionsStore.deleteSession(deviceId)
  }, [])

  const onTerminateAllSession = useCallback(async () => {
    await profileSessionsStore.terminateAllSessions()
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    try {
      profileSessionsStore.getSessions()
    } catch (error) {
      responseErrorHandler(error)
    }

    return () => {
      controller.abort()
    }
  }, [])

  return {
    currentSession,
    onLogoutDeviceClick,
    onTerminateAllSession,
  }
}

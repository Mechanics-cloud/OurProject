import { useCallback, useEffect } from 'react'

import { responseErrorHandler } from '@/common'
import { generalStore } from '@/core/store'
import { profileSessionsStore } from '@/features/profile/settings/devices'

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

    const fetchSessions = async () => {
      try {
        generalStore.turnOnLoading()
        await profileSessionsStore.getSessions()
      } catch (error) {
        responseErrorHandler(error)
      } finally {
        generalStore.turnOffLoading()
      }
    }

    fetchSessions()

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

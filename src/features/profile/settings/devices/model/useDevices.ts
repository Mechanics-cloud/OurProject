import { useEffect } from 'react'

import { responseErrorHandler } from '@/common'
import { profileSessionsStore } from '@/features/profile/settings/devices/model/profileSessionsStore'

export const useDevices = () => {
  const currentSession = profileSessionsStore.sessions?.current
  const otherSession =
    profileSessionsStore.sessions?.others.filter(
      (session) => session.deviceId !== currentSession?.deviceId
    ) ?? []

  useEffect(() => {
    try {
      profileSessionsStore.getSessions()
    } catch (error) {
      responseErrorHandler(error)
    }
  }, [])

  const onLogoutDeviceClick = async (deviceId: number) => {
    await profileSessionsStore.deleteSession(deviceId)
  }

  const onTerminateAllSession = async () => {
    await profileSessionsStore.terminateAllSessions()
  }

  return {
    currentSession,
    onLogoutDeviceClick,
    onTerminateAllSession,
    otherSession,
  }
}

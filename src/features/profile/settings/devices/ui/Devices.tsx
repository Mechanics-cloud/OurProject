import { useEffect } from 'react'

import {
  Button,
  Loader,
  Typography,
  responseErrorHandler,
  useTranslation,
} from '@/common'
import { profileSessionsStore } from '@/features/profile/settings/devices/model'
import { Device } from '@/features/profile/settings/devices/ui/Device'
import { observer } from 'mobx-react-lite'

export const Devices = observer(() => {
  const { t } = useTranslation()

  useEffect(() => {
    try {
      profileSessionsStore.getSessions()
    } catch (error) {
      responseErrorHandler(error)
    }
  }, [])

  return (
    <div>
      {profileSessionsStore.loading ? (
        <Loader />
      ) : (
        <>
          <Typography variant={'h3'}>
            {t.profileSessions.currentSession}
          </Typography>
          <Device
            deviceName={
              profileSessionsStore.sessions?.current.browserName ?? ''
            }
            deviceType={'chrome'}
            ip={profileSessionsStore.sessions?.current.ip ?? ''}
          />
          <Button variant={'outline'}>{t.profileSessions.terminateAll}</Button>
          <Typography variant={'h3'}>
            {t.profileSessions.activeSessions}
          </Typography>
        </>
      )}
    </div>
  )
})

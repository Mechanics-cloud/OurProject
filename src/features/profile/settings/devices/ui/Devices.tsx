import { Loader, Typography, useTranslation } from '@/common'
import { profileSessionsStore } from '@/features/profile/settings/devices/model'
import { useDevices } from '@/features/profile/settings/devices/model/useDevices'
import { Device } from '@/features/profile/settings/devices/ui/Device'
import { OtherSessions } from '@/features/profile/settings/devices/ui/OtherSessions'
import { observer } from 'mobx-react-lite'

export const Devices = observer(() => {
  const { t } = useTranslation()
  const {
    currentSession,
    onLogoutDeviceClick,
    onTerminateAllSession,
    otherSession,
  } = useDevices()

  return (
    <div className={'mt-8 w-full'}>
      {profileSessionsStore.loading ? (
        <Loader />
      ) : (
        <>
          <Typography variant={'h3'}>
            {t.profileSessions.currentSession}
          </Typography>
          <Device
            browserName={currentSession?.browserName ?? 'Desktop'}
            className={'mt-1.5 mb-6'}
            ip={currentSession?.ip ?? ''}
          />
          {otherSession.length > 0 && (
            <OtherSessions
              onLogoutDeviceClick={onLogoutDeviceClick}
              onTerminateAllSession={onTerminateAllSession}
              sessions={otherSession}
            />
          )}
        </>
      )}
    </div>
  )
})

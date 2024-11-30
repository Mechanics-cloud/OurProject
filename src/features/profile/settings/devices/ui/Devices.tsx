import { AsyncComponent, Typography, useTranslation } from '@/common'
import { generalStore } from '@/core/store'
import {
  Device,
  DevicesSkeleton,
  OtherSessions,
  useDevices,
} from '@/features/profile/settings/devices'
import { observer } from 'mobx-react-lite'

export const Devices = observer(() => {
  const { t } = useTranslation()
  const { currentSession, onLogoutDeviceClick, onTerminateAllSession } =
    useDevices()

  return (
    <div className={'mt-8 w-full'}>
      <AsyncComponent
        isLoading={generalStore.isLoading}
        loader={<DevicesSkeleton />}
      >
        <Typography variant={'h3'}>
          {t.profileSessions.currentSession}
        </Typography>
        <Device
          browserName={currentSession?.browserName ?? 'Desktop'}
          className={'mt-1.5 mb-6'}
          ip={currentSession?.ip ?? ''}
        />
        <OtherSessions
          onLogoutDeviceClick={onLogoutDeviceClick}
          onTerminateAllSession={onTerminateAllSession}
        />
      </AsyncComponent>
    </div>
  )
})

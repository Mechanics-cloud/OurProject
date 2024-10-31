import { Button, Typography, useTranslation } from '@/common'
import { DeviceType } from '@/features/profile/settings/devices/api'
import { Device } from '@/features/profile/settings/devices/ui/Device'

type Props = {
  onLogoutDeviceClick: (deviceId: number) => void
  onTerminateAllSession: () => void
  sessions: DeviceType[]
}

export const OtherSessions = ({
  onLogoutDeviceClick,
  onTerminateAllSession,
  sessions,
}: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <Button
        className={'ml-auto block'}
        onClick={onTerminateAllSession}
        variant={'outline'}
      >
        {t.profileSessions.terminateAll}
      </Button>
      <Typography
        className={'my-[18px]'}
        variant={'h3'}
      >
        {t.profileSessions.activeSessions}
      </Typography>
      {sessions.length > 0 ? (
        sessions.map((device) => (
          <Device
            browserName={device.browserName}
            className={'mt-1.5 mb-6'}
            ip={device.ip}
            key={device.browserVersion}
            lastActive={device.lastActive}
            onLogoutClick={() => onLogoutDeviceClick(device.deviceId)}
          />
        ))
      ) : (
        <Typography variant={'h2'}>
          You have not yet logged in from other devices
        </Typography>
      )}
    </>
  )
}

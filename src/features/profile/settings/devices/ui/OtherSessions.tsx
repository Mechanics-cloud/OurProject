import { Button, Typography, useTranslation } from '@/common'
import { profileSessionsStore } from '@/features/profile/settings/devices'
import { observer } from 'mobx-react-lite'

import { Device } from './Device'

type Props = {
  onLogoutDeviceClick: (deviceId: number) => void
  onTerminateAllSession: () => void
}

export const OtherSessions = observer(
  ({ onLogoutDeviceClick, onTerminateAllSession }: Props) => {
    const { t } = useTranslation()
    const sessions = profileSessionsStore.otherSession ?? []
    const isOtherSessionEmpty = sessions.length === 0

    return (
      <>
        <Button
          className={'ml-auto block'}
          disabled={isOtherSessionEmpty}
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
        {isOtherSessionEmpty ? (
          <Typography
            className={'text-center'}
            variant={'h2'}
          >
            You have not yet logged in from other devices
          </Typography>
        ) : (
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
        )}
      </>
    )
  }
)

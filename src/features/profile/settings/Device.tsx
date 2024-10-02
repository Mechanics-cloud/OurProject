import { Chrome, Desktop, LogOut, Mobile } from '@/assets/icons/filledIcons'
import { Card, LinkWithIcon, Typography } from '@/common'

type Props = {
  deviceName: string
  deviceType: 'chrome' | 'desktop' | 'mobile'
  ip: string
  lastActive?: string
}

export const Device = ({ deviceName, deviceType, ip, lastActive }: Props) => {
  let IconToShow

  switch (deviceType) {
    case 'chrome':
      IconToShow = Chrome
      break
    case 'mobile':
      IconToShow = Mobile
      break
    case 'desktop':
    default:
      IconToShow = Desktop
  }

  return (
    <Card className={'flex gap-3 w-full flex-nowrap items-center py-5 px-6'}>
      <IconToShow className={'size-9 self-start mt-1.5'} />
      <div className={'mr-auto'}>
        <Typography
          className={'mb-3'}
          variant={'bold16'}
        >
          {deviceName}
        </Typography>
        <Typography
          className={'mb-1'}
          variant={'reg14'}
        >
          IP: {ip}
        </Typography>
        {lastActive && (
          <Typography variant={'small'}>Last visit: {lastActive}</Typography>
        )}
      </div>
      {lastActive && (
        <LinkWithIcon
          DefaultIcon={LogOut}
          as={'button'}
        >
          Log out
        </LinkWithIcon>
      )}
    </Card>
  )
}

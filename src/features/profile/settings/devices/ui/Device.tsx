import { ComponentPropsWithoutRef } from 'react'

import { Chrome, Desktop, LogOut } from '@/assets/icons/filledIcons'
import { Card, LinkWithIcon, Typography, cn } from '@/common'
import { BrowserNames } from '@/features/profile/settings/devices/api'

type Props = {
  browserName: BrowserNames
  ip: string
  lastActive?: string
  onLogoutClick?: (deviceId: number) => void
} & ComponentPropsWithoutRef<'div'>

export const Device = ({
  browserName,
  className,
  ip,
  lastActive,
  onLogoutClick,
  ...props
}: Props) => {
  let IconToShow

  switch (browserName) {
    case 'Chrome':
      IconToShow = Chrome
      break
    case 'Firefox':
      IconToShow = Chrome
      break
    case 'Edge':
      IconToShow = Chrome
      break
    case 'Safari':
      IconToShow = Chrome
      break
    case 'Yandex':
      IconToShow = Chrome
      break
    case 'Opera':
      IconToShow = Chrome
      break
    default:
      IconToShow = Desktop
  }

  return (
    <Card
      className={cn(
        'flex gap-3 w-full flex-nowrap items-center py-5 px-6',
        className
      )}
      {...props}
    >
      <IconToShow className={'size-9 self-start mt-1.5'} />
      <div className={'mr-auto'}>
        <Typography
          className={'mb-3'}
          variant={'bold16'}
        >
          {browserName}
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
          onClick={onLogoutClick}
        >
          Log out
        </LinkWithIcon>
      )}
    </Card>
  )
}

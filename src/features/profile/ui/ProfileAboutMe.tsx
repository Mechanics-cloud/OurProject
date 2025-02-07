import { HTMLAttributes } from 'react'

import { Typography, cn } from '@/common'

type Props = {
  aboutMe?: string
  isMobile: boolean
} & HTMLAttributes<HTMLDivElement>
export const ProfileAboutMe = ({
  aboutMe,
  className,
  isMobile,
  ...props
}: Props) => {
  return (
    <div
      className={cn('break-words', className)}
      {...props}
    >
      {aboutMe && (
        <Typography variant={isMobile ? 'small' : 'reg14'}>
          {aboutMe}
        </Typography>
      )}
    </div>
  )
}

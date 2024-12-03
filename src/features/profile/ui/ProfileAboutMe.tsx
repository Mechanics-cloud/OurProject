import { HTMLAttributes } from 'react'

import { Typography } from '@/common'

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
      className={className}
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

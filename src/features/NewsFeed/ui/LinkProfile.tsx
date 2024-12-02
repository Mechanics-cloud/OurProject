import { Paths, Typography } from '@/common'
import Link from 'next/link'

type Props = {
  userId: number
  userName: string
}

export const LinkProfile = ({ userId, userName }: Props) => {
  return (
    <Link href={`${Paths.profileLink(userId)}`}>
      <Typography
        className={'inline'}
        variant={'bold16'}
      >
        {userName}
      </Typography>
    </Link>
  )
}

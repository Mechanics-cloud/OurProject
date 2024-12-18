import { Typography, timeAgo } from '@/common'
import { useRouter } from 'next/router'

export const TimeAgo = ({ createdAt }: { createdAt: string }) => {
  const router = useRouter()

  return (
    <Typography
      className={'text-light-900'}
      variant={'small'}
    >
      {timeAgo(createdAt, router.locale)}
    </Typography>
  )
}

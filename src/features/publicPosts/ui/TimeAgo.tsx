import { timeAgo } from '@/common'
import { useRouter } from 'next/router'

export const TimeAgo = ({ createdAt }: { createdAt: string }) => {
  const router = useRouter()

  return <p className={'text-light-900'}>{timeAgo(createdAt, router.locale)}</p>
}

import { ReactNode } from 'react'

import { Skeleton } from '@/common'

type Props = {
  children: ReactNode
  className: string
  isProfileLoading: boolean
}
export const LoadingComponent = ({
  children,
  className,
  isProfileLoading,
}: Props) => {
  return <>{isProfileLoading ? <Skeleton className={className} /> : children}</>
}

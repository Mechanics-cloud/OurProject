import { Paths, typographyVariants } from '@/common'
import Link from 'next/link'

type Props = {
  userId: number
  userName: string
}

export const LinkProfile = ({ userId, userName }: Props) => {
  return (
    <Link href={`${Paths.profileLink(userId)}`}>
      <span className={typographyVariants({ variant: 'h3' })}>{userName}</span>
    </Link>
  )
}

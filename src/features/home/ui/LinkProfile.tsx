import Link from 'next/link'

type Props = {
  userId: number
  userName: string
}

export const LinkProfile = ({ userId, userName }: Props) => {
  return (
    <Link href={`/profile/${userId}`}>
      <b>{userName} </b>
    </Link>
  )
}

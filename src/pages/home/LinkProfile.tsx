import Link from 'next/link'

type LinkProfileType = {
  userId: number
  userName: string
}

export const LinkProfile = ({ userId, userName }: LinkProfileType) => {
  return (
    <Link href={`/profile/${userId}`}>
      <b>{userName} </b>
    </Link>
  )
}

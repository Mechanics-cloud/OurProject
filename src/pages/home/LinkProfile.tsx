import Link from 'next/link'

type LinkProfileType = {
  userName: string
}

export const LinkProfile = ({ userName }: LinkProfileType) => {
  return (
    <Link href={'/profile'}>
      <b>{userName} </b>
    </Link>
  )
}

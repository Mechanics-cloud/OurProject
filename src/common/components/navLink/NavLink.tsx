import { ReactNode } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  active: ReactNode
  href: string
  inactive: ReactNode
  label?: string
}

export const NavLink = ({ active, href, inactive, label }: Props) => {
  const { asPath } = useRouter()

  return (
    <Link href={href}>
      {href === asPath ? active : inactive}
      <span className={'sr-only'}>{label}</span>
    </Link>
  )
}

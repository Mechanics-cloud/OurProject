import React, { ReactNode } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  active: ReactNode
  href: string
  inactive: ReactNode
  label?: string
}

export const NavLink = React.forwardRef<HTMLSpanElement, Props>(
  ({ active, href, inactive, label }, ref) => {
    const { asPath } = useRouter()

    return (
      <Link href={href}>
        {href === asPath ? active : inactive}
        <span
          className={'sr-only'}
          ref={ref}
        >
          {label}
        </span>
      </Link>
    )
  }
)

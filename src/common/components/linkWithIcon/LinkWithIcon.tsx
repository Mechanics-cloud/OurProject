import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { cn } from '@/common/utils/cn'
import { getBasePath } from '@/common/utils/getBasePath'
import Link from 'next/link'
import { useRouter } from 'next/router'

const styles = {
  activeLink: 'text-accent-500 font-bold',
  link: 'flex items-center gap-3 [&_svg]:w-6 [&_svg]:h-6 rounded-sm focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-accent-700 focus-visible:outline-none hover:text-accent-100',
}

type Props<T extends ElementType = typeof Link> = {
  ActiveIcon?: ReactNode
  DefaultIcon: ReactNode
  as?: T
  disabled?: boolean
  iconTrigger?: boolean | string
} & ComponentPropsWithoutRef<T>

export const LinkWithIcon = React.forwardRef<HTMLElement, Props<ElementType>>(
  function NavLink(
    {
      ActiveIcon,
      DefaultIcon,
      as,
      children,
      className,
      disabled,
      href,
      iconTrigger,
      ...rest
    },
    ref
  ) {
    const Component = as || Link
    const { pathname } = useRouter()

    let isActive: boolean

    if (Component === Link) {
      isActive = getBasePath(pathname) === getBasePath(href)
    } else {
      isActive = !!iconTrigger
    }

    return (
      <Component
        href={href}
        {...rest}
        aria-disabled={disabled}
        className={cn(
          styles.link,
          isActive && styles.activeLink,
          disabled && 'pointer-events-none text-dark-100',
          'py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-300 w-full',
          className
        )}
        ref={ref}
        tabIndex={disabled ? -1 : undefined}
      >
        {isActive && ActiveIcon ? <ActiveIcon /> : <DefaultIcon />}
        {children}
      </Component>
    )
  }
)

LinkWithIcon.displayName = 'LinkWithIcon'

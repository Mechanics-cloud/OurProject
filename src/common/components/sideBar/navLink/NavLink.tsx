import { ComponentPropsWithoutRef, ElementType } from 'react'

import { cn } from '@/common/utils/cn'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

const styles = {
  activeLink: 'text-accent-500 font-bold',
  link: 'flex items-center gap-3 [&_svg]:w-6 [&_svg]:h-6 rounded-sm focus-visible:border-transparent  focus-visible:ring-2 focus-visible:ring-accent-700  focus-visible:outline-none  hover:text-accent-100',
}

type Props<T extends ElementType = typeof Link> = {
  ActiveIcon: ElementType
  DefaultIcon: ElementType
  as?: T
  disabled?: boolean
  iconTrigger?: boolean | string
} & ComponentPropsWithoutRef<T>

export const NavLink = <T extends ElementType = typeof Link>({
  ActiveIcon,
  DefaultIcon,
  as,
  children,
  className,
  disabled,
  href,
  iconTrigger,
  ...rest
}: Props<T>) => {
  const Component = as || Link

  const { pathname } = useRouter()

  const isActive = Component === Link ? pathname.includes(href) : iconTrigger

  return (
    <li>
      <Component
        href={href}
        {...rest}
        aria-disabled={disabled}
        className={cn(
          className,
          styles.link,
          isActive && styles.activeLink,
          disabled && 'pointer-events-none text-dark-100'
        )}
        tabIndex={disabled ? -1 : undefined}
      >
        {isActive ? <ActiveIcon /> : <DefaultIcon />}
        {children}
      </Component>
    </li>
  )
}

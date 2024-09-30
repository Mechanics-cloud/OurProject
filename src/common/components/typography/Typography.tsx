import { ComponentPropsWithoutRef, ElementType } from 'react'

import { typographyVariants } from '@/common/components/typography/typographyVariants'
import { cn } from '@/common/utils/cn'
import { VariantProps } from 'class-variance-authority'
import Link from 'next/link'

export type Variant = NonNullable<
  VariantProps<typeof typographyVariants>['variant']
>

const typographyTags: Record<Variant, ElementType> = {
  bold14: 'p',
  bold16: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  large: 'div',
  med14: 'p',
  reg14: 'p',
  reg16: 'p',
  regularLink: Link,
  semiBoldSmall: 'p',
  small: 'p',
  smallLink: Link,
}

type Props = ComponentPropsWithoutRef<ElementType> &
  VariantProps<typeof typographyVariants>

export const Typography = ({
  className,
  variant = 'reg16',
  ...props
}: Props) => {
  const Component = variant ? typographyTags[variant] : 'p'

  return (
    <Component
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  )
}

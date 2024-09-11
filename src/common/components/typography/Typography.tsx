import { ComponentPropsWithoutRef, ElementType } from 'react'
import { VariantProps } from 'class-variance-authority'
import { cn } from '@/common/utils/cn'
import { typographyVariants } from '@/common/components/typography/typographyVariants'

type Variant = NonNullable<VariantProps<typeof typographyVariants>['variant']>

const typographyTags: Record<Variant, ElementType> = {
  large: 'div',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  reg16: 'p',
  bold16: 'p',
  reg14: 'p',
  med14: 'p',
  bold14: 'p',
  small: 'p',
  semiBoldSmall: 'p',
  regularLink: 'a',
  smallLink: 'a',
}

type Props = VariantProps<typeof typographyVariants> &
  ComponentPropsWithoutRef<ElementType>

export const Typography = ({
  variant = 'reg16',
  className,
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

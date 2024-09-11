import { ComponentPropsWithoutRef, ElementType } from 'react'
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/common/utils/cn'

export const typographyVariants = cva([], {
  variants: {
    variant: {
      large: ['text-xxl', 'font-600', 'leading-[36px]'],
      h1: ['text-xl', 'font-700', 'leading-[36px]'],
      h2: ['text-l', 'font-700', 'leading-[24px]'],
      h3: ['text-m', 'font-600', 'leading-[24px]'],
      reg16: ['text-m', 'font-400', 'leading-[24px]'],
      bold16: ['text-m', 'font-700', 'leading-[24px]'],
      reg14: ['text-s', 'font-400', 'leading-[24px]'],
      med14: ['text-s', 'font-500', 'leading-[24px]'],
      bold14: ['text-s', 'font-700', 'leading-[24px]'],
      small: ['text-xs', 'font-400', 'leading-[16px]'],
      semiBoldSmall: ['text-xs', 'font-600', 'leading-[14px]'],
      regularLink: ['text-s', 'font-400', 'leading-[26px]', 'text-accent-500', 'underline'],
      smallLink: ['text-xs', 'font-400', 'leading-[16px]', 'text-accent-500', 'underline']
    },
  },
  defaultVariants: {
    variant: 'reg16',
  },
});

const typographyTags: Record<string, ElementType> = {
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
};

type Props = VariantProps<typeof typographyVariants> &
  ComponentPropsWithoutRef<ElementType>;

export const Typography = ({ variant = 'reg16', className, ...props }: Props) => {
  const Component = variant ? typographyTags[variant] : 'p';
  return <Component className={cn(typographyVariants({ variant }), className)} {...props} />;
};
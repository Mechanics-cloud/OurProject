import { ComponentProps } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
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

type Props = VariantProps<typeof typographyVariants> & ComponentProps<'p'> & {
  asChild?: boolean
}

export const Typography = ({ variant = 'reg16', className, asChild, ...props }: Props) => {
  const Component = asChild ? Slot : 'p'
  return <Component className={cn(typographyVariants({ variant }), className)} {...props} />;
};
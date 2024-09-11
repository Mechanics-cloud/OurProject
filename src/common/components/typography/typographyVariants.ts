import { cva } from 'class-variance-authority'

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
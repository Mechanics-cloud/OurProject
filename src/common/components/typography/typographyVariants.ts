import { cva } from 'class-variance-authority'

export const typographyVariants = cva([], {
  defaultVariants: {
    variant: 'reg16',
  },
  variants: {
    variant: {
      bold14: ['text-sm', 'font-700', 'leading-[24px]'],
      bold16: ['text-base', 'font-700', 'leading-[24px]'],
      h1: ['text-xl', 'font-700', 'leading-[36px]'],
      h2: ['text-l', 'font-700', 'leading-[24px]'],
      h3: ['text-m', 'font-600', 'leading-[24px]'],
      large: ['text-xxl', 'font-600', 'leading-[36px]'],
      med14: ['text-sm', 'font-500', 'leading-[24px]'],
      reg14: ['text-sm', 'font-400', 'leading-[24px]'],
      reg16: ['text-base', 'font-400', 'leading-[24px]'],
      regularLink: [
        'text-s',
        'font-400',
        'leading-[26px]',
        'text-accent-500',
        'underline',
      ],
      semiBoldSmall: ['text-xs', 'font-600', 'leading-[14px]'],
      small: ['text-xs', 'font-400', 'leading-[16px]'],
      smallLink: [
        'text-xs',
        'font-400',
        'leading-[16px]',
        'text-accent-500',
        'underline',
      ],
    },
  },
})

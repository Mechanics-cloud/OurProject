import { cva } from 'class-variance-authority'

export const typographyVariants = cva([], {
  defaultVariants: {
    variant: 'reg16',
  },
  variants: {
    variant: {
      bold14: ['font-bold', 'leading-[24px]', 'text-[14px]'],
      bold16: ['font-bold', 'leading-[24px]', 'text-[16px]'],
      h1: ['font-bold', 'leading-[36px]', 'text-[20px]'],
      h2: ['font-bold', 'leading-[24px]', 'text-[18px]'],
      h3: ['font-semibold', 'leading-[24px]', 'text-[16px]'],
      large: ['font-semibold', 'leading-[36px]', 'text-[26px]'],
      med14: ['font-medium', 'leading-[24px]', 'text-[14px]'],
      reg14: ['font-normal', 'leading-[24px]', 'text-[14px]'],
      reg16: ['font-normal', 'leading-[24px]', 'text-[16px]'],
      regularLink: [
        'font-normal',
        'leading-[26px]',
        'text-[14px]',
        'text-accent-500',
        'underline',
      ],
      semiBoldSmall: ['font-semibold', 'leading-[14px]', 'text-[12px]'],
      small: ['font-normal', 'leading-[16px]', 'text-[12px]'],
      smallLink: [
        'font-normal',
        'leading-[16px]',
        'text-[12px]',
        'text-accent-500',
        'underline',
      ],
    },
  },
})

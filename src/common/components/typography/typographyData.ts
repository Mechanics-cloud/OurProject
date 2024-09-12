import { typographyVariants } from '@/common/components/typography/typographyVariants'
import { VariantProps } from 'class-variance-authority'

type TypographyVariant = VariantProps<typeof typographyVariants>['variant']

export const typographyData: TypographyVariant[] = [
  'large',
  'h1',
  'h2',
  'h3',
  'reg16',
  'bold16',
  'reg14',
  'med14',
  'bold14',
  'small',
  'semiBoldSmall',
  'regularLink',
  'smallLink',
]

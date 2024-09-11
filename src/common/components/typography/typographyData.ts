import { Typography, typographyVariants } from '@/common/components/typography/Typography'
import { VariantProps } from 'class-variance-authority'
import { ReactElement } from 'react'

const typographyElements = {
  large: Typography({variant: 'large'}),
  h1: Typography({variant: 'h1'}),
  h2: Typography({variant: 'h2'}),
  h3: Typography({variant: 'h3'}),
  reg16: Typography({variant: 'reg16'}),
  bold16: Typography({variant: 'bold16'}),
  reg14: Typography({variant: 'reg14'}),
  med14: Typography({variant: 'med14'}),
  bold14: Typography({variant: 'bold14'}),
  small: Typography({variant: 'small'}),
  semiBoldSmall: Typography({variant: 'semiBoldSmall'}),
  regularLink: Typography({variant: 'regularLink'}),
  smallLink: Typography({variant: 'smallLink'})
}

type TypographyVariant = VariantProps<typeof typographyVariants>['variant'];
type TypographyData = {
  id: TypographyVariant,
  component: ReactElement
}

export const typographyData: TypographyData[] = [
  {
    id: 'large',
    component: typographyElements.large
  },
  {
    id: 'h1',
    component: typographyElements.h1
  },
  {
    id: 'h2',
    component: typographyElements.h2
  },
  {
    id: 'h3',
    component: typographyElements.h3
  },
  {
    id: 'reg16',
    component: typographyElements.reg16
  },
  {
    id: 'bold16',
    component: typographyElements.bold16
  },
  {
    id: 'reg14',
    component: typographyElements.reg14
  },
  {
    id: 'med14',
    component: typographyElements.med14
  },
  {
    id: 'bold14',
    component: typographyElements.bold14
  },
  {
    id: 'small',
    component: typographyElements.small
  },
  {
    id: 'semiBoldSmall',
    component: typographyElements.semiBoldSmall
  },
  {
    id: 'regularLink',
    component: typographyElements.regularLink
  },
  {
    id: 'smallLink',
    component: typographyElements.smallLink
  },
]
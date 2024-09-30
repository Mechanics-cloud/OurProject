import { ReactNode } from 'react'

import { ArrowBackOutline } from '@/assets/icons/outlineIcons'
import { Typography } from '@/common/components'
import Link from 'next/link'

type Props = {
  children: ReactNode
  title: string
}
export const TermsPolicyLayout = ({ children, title }: Props) => {
  return (
    <div className={'size-full'}>
      <div className={'flex gap-3 items-center w-full mt-6 mb-6'}>
        <ArrowBackOutline />
        <Link href={'/auth/sign-up'}>Back to Sign-Up</Link>
      </div>
      <Typography
        className={'text-center mb-5'}
        variant={'h1'}
      >
        {title}
      </Typography>
      <div className={'text-center ml-[101px] mr-[97px] mb-[227px]'}>
        {children}
      </div>
    </div>
  )
}

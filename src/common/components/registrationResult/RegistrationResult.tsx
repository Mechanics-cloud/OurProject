import { ReactNode } from 'react'

import { Typography } from '@/common'

type Props = {
  children: ReactNode
  text: string
  title: string
}

export const RegistrationResult = ({ children, text, title }: Props) => {
  return (
    <>
      <div className={'max-w-80 text-center m-auto'}>
        <Typography
          className={'md:mb-5 mb-3'}
          variant={'h1'}
        >
          {title}
        </Typography>
        <Typography
          className={'md:mb-14 mb-16'}
          variant={'reg16'}
        >
          {text}
        </Typography>
      </div>

      <div className={'flex flex-col md:flex-col-reverse items-center w-full'}>
        {children}
      </div>
    </>
  )
}

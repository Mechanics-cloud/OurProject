import * as React from 'react'

import { FlagRussia, FlagUnitedKingdom } from '@/assets/icons/filledIcons'
import {
  ArrowIosDownOutline,
  MoreHorizontalOutline,
} from '@/assets/icons/outlineIcons'
import { Typography } from '@/common/components/typography'
import Link from 'next/link'

type HeaderProps = {
  isAuth?: boolean
}

const mobileHeader = ({ isAuth }: HeaderProps) => {
  return (
    <header
      className={
        'fixed top-0 left-0 w-full h-[3.75rem] bg-dark-700 text-light-100 flex items-center justify-between pr-4 border-b border-b-dark-300'
      }
    >
      <Typography
        className={'ml-4 py-3'}
        variant={'large'}
      >
        <Link
          href={'/'}
          title={'Go Home'}
        >
          Inctagram
        </Link>
      </Typography>
      <div className={'flex items-center gap-6'}>
        <button
          className={'flex items-center gap-0.5'}
          onClick={() => alert('Hey people!')}
          type={'button'}
        >
          <FlagRussia className={'w-6 h-6'} />
          <ArrowIosDownOutline className={'w-4 h-4'} />
        </button>
        {isAuth && (
          <button
            onClick={() => alert('Hey people!')}
            type={'button'}
          >
            <MoreHorizontalOutline
              className={'w-6 h-6 active:text-accent-700'}
            />
          </button>
        )}
      </div>
    </header>
  )
}

export { mobileHeader }

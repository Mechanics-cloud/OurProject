import * as React from 'react'

import { LangSelect } from '@/common'
import { Button } from '@/common'
import { Typography } from '@/common/components/typography'
import Link from 'next/link'

import { useTranslation } from '../../../../hooks/useTranslation'
import OutlineBell from '../../../assets/icons/outlineIcons/OutlineBell'

type HeaderProps = {
  isAuth?: boolean
}

const Header = ({ isAuth }: HeaderProps) => {
  const { t } = useTranslation()

  return (
    <header
      className={
        'fixed top-0 left-0 w-full h-[var(--header-height)] bg-dark-700 text-light-100 flex items-center justify-between pr-16 border-b border-b-dark-300'
      }
    >
      <Typography
        className={'ml-14 py-3'}
        variant={'large'}
      >
        <Link
          href={'/'}
          title={'Go Home'}
        >
          Inctagram
        </Link>
      </Typography>

      <div className={'flex items-center '}>
        {isAuth && (
          <button
            className={'cursor-pointer mr-12'}
            onClick={() => alert('Картинка нажата!')}
            type={'button'}
          >
            <OutlineBell className={' w-6 h-6'} />
          </button>
        )}
        <LangSelect />
        {!isAuth && (
          <>
            <Button
              className={'mr-6 ml-9'}
              variant={'text'}
            >
              {t.header.logIn}
            </Button>
            <Button>{t.header.signUp}</Button>
          </>
        )}
      </div>
    </header>
  )
}

export { Header }

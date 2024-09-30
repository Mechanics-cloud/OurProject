import * as React from 'react'

import { Button, LangSelect, Select, SelectItem } from '@/common'
import { Typography } from '@/common/components/typography'
import { Paths } from '@/common/paths'
import { useTranslation } from '@hooks/useTranslation'
import Link from 'next/link'

import OutlineBell from '../../../assets/icons/outlineIcons/OutlineBell'

type HeaderProps = {
  isAuth?: boolean
}

const Header = ({ isAuth }: HeaderProps) => {
  const { t } = useTranslation()

  return (
    <header
      className={
        'fixed z-50 top-0 left-0 w-full max-h-[var(--header-height)] bg-dark-700 text-light-100 flex items-center justify-between pr-16 border-b border-b-dark-300'
      }
    >
      <Typography
        className={'ml-14 py-3'}
        variant={'large'}
      >
        <Link
          href={Paths.home}
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
            <OutlineBell className={'size-6'} />
          </button>
        )}
        <LangSelect />
        {!isAuth && (
          <>
            <Button
              className={'mr-6 ml-9'}
              variant={'text'}
            >
              <Link href={Paths.signIn}>{t.logIn}</Link>
            </Button>
            <Button asChild>
              <Link href={Paths.signUp}>{t.signUp}</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  )
}

export { Header }

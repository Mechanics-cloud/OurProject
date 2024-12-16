import * as React from 'react'

import { OutlineBell } from '@/assets/icons'
import { Button, LangSelect, cn, useTranslation } from '@/common'
import { MobilePopover } from '@/common/components/header/mobilePopover'
import { Typography } from '@/common/components/typography'
import { useScreenWidth } from '@/common/hooks/useScreenWidth'
import { Paths } from '@/common/paths'
import { generalStore } from '@/core/store'
import Link from 'next/link'

const Header = () => {
  const { t } = useTranslation()
  const isAuth = !!generalStore.user
  const { isTablet } = useScreenWidth()

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full max-h-[var(--header-height)] bg-dark-700 text-light-100 border-b border-b-dark-300',
        !isTablet && 'pr-scrollbar'
      )}
    >
      <div
        className={
          'max-w-screen-2xl mx-auto flex items-center justify-between px-6 md:px-10 lg:px-16'
        }
      >
        <Typography
          className={'py-3'}
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
              className={'cursor-pointer mr-12 hidden lg:block'}
              onClick={() => alert('Картинка нажата!')}
              type={'button'}
            >
              <OutlineBell className={'size-6'} />
            </button>
          )}
          <LangSelect />
          {isAuth && <MobilePopover className={'ml-3'} />}
          {!isAuth && (
            <>
              <Button
                asChild
                className={'mr-3 px-4 md:ml-9 md:mr-6 md:px-6'}
                variant={'text'}
              >
                <Link href={Paths.signIn}>{t.logIn}</Link>
              </Button>
              <Button
                asChild
                className={'px-4 md:px-6'}
              >
                <Link href={Paths.signUp}>{t.signUp}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export { Header }

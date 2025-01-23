import * as React from 'react'

import { OutlineBell } from '@/assets/icons'
import { Button, LangSelect, cn, useTranslation } from '@/common'
import { MobilePopover } from '@/common/components/header/mobilePopover'
import { Typography } from '@/common/components/typography'
import { Paths } from '@/common/paths'
import { generalStore } from '@/core/store'
import Link from 'next/link'

const Header = () => {
  const { t } = useTranslation()
  const isAuth = !!generalStore.user

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full max-h-[var(--header-height)] bg-dark-700 text-light-100 border-b border-b-dark-300 lg:pr-scrollbar'
      )}
    >
      <div
        className={
          'max-w-screen-2xl mx-auto flex items-center justify-between px-6 md:px-10 lg:px-16'
        }
      >
        <Typography
          className={'py-3 text-[16px] md:text-[26px]'}
          variant={'large'}
        >
          <Link
            href={isAuth ? Paths.home : Paths.publicMainPage}
            title={'Go Home'}
          >
            Inctagram
          </Link>
        </Typography>

        <div className={'flex items-center'}>
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
                className={'mr-3 px-2 md:ml-9 md:mr-6 md:px-6'}
                variant={'text'}
              >
                <Link
                  className={'text-xs xs:text-base'}
                  href={Paths.signIn}
                >
                  {t.signIn.title}
                </Link>
              </Button>
              <Button
                asChild
                className={'px-2 md:px-6'}
              >
                <Link
                  className={'text-xs xs:text-base'}
                  href={Paths.signUp}
                >
                  {t.signUp.title}
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export { Header }

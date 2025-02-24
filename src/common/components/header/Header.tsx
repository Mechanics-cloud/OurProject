import * as React from 'react'

import { OutlineBell } from '@/assets/icons'
import {
  Button,
  LangSelect,
  ProtectedPaths,
  PublicPaths,
  cn,
  useModal,
  useTranslation,
} from '@/common'
import { MobilePopover } from '@/common/components/header/mobilePopover'
import { Notification } from '@/common/components/header/notification/Notification'
import { Typography } from '@/common/components/typography'
import { generalStore } from '@/core/store'
import { NotificationRing } from '@/features/notifications'
import Link from 'next/link'

const Header = () => {
  const { t } = useTranslation()
  const isAuth = !!generalStore.user

  const { isModalOpen, onModalClose, openModal } = useModal()

  const onToggleNotification = () => {
    if (isModalOpen) {
      onModalClose()
    } else {
      openModal()
    }
  }

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
            href={isAuth ? ProtectedPaths.home : PublicPaths.publicMainPage}
            title={'Go Home'}
          >
            Inctagram
          </Link>
        </Typography>

        <div className={'flex items-center'}>
          {/*todo или вынести колокольчик в NotificationRing, или удалить этот код :)  */}
          {/*{isAuth && <NotificationRing />}*/}
          {isAuth && (
            <button
              className={'cursor-pointer mr-12 hidden lg:block relative'}
              onClick={onToggleNotification}
              type={'button'}
            >
              <OutlineBell
                className={'size-6'}
                fill={isModalOpen ? '#397DF6' : 'currentColor'}
              />
              {isModalOpen && <Notification />}
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
                  href={PublicPaths.signIn}
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
                  href={PublicPaths.signUp}
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

import React, { ComponentPropsWithoutRef } from 'react'

import {
  Home,
  MessageCircle,
  Person,
  PlusSquare,
  Search,
} from '@/assets/icons/filledIcons'
import {
  HomeOutline,
  MessageCircleOutline,
  PersonOutline,
  PlusSquareOutline,
  SearchOutline,
} from '@/assets/icons/outlineIcons'
import {
  PathService,
  ProtectedPaths,
  PublicPaths,
  cn,
  useModal,
  useTranslation,
} from '@/common'
import { matchesPathname } from '@/common/components/menu/matchesPathname'
import { NavLink } from '@/common/components/navLink'
import { Tooltip } from '@/common/components/tooltip'
import { generalStore } from '@/core/store'
import { NewPostDialog } from '@/features/createPost/ui/NewPostDialog'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Menu = ({ className }: ComponentPropsWithoutRef<'nav'>) => {
  const router = useRouter()
  const { t } = useTranslation()
  const href = router.asPath

  const {
    isModalOpen: isNewPostModalOpen,
    onModalClose: onNewPostModalClose,
    openModal: openNewPostModal,
  } = useModal()

  const userId = generalStore.user?.userId

  return (
    <nav
      className={cn(
        'min-w-[320px] w-full bg-dark-900 border-t border-dark-300 fixed bottom-0 left-0 right-0 z-[50] lg:hidden',
        className
      )}
    >
      <ul className={'flex w-full justify-evenly py-[16px]'}>
        <li>
          <Tooltip title={t.menu.home}>
            <Link href={ProtectedPaths.home}>
              {matchesPathname(href, ProtectedPaths.home) ? (
                <Home className={'size-6 text-accent-500'} />
              ) : (
                <HomeOutline className={'size-6'} />
              )}
              <span className={'sr-only'}>{t.menu.home}</span>
            </Link>
          </Tooltip>
        </li>
        <li className={'group'}>
          <Tooltip title={t.menu.create}>
            <button
              onClick={openNewPostModal}
              type={'button'}
            >
              <PlusSquareOutline
                className={'size-6 group-hover:hidden group-active:hidden'}
              />
              <PlusSquare
                className={
                  'size-6 hidden group-hover:block group-active:block text-accent-500'
                }
              />
              <span className={'sr-only'}>{t.menu.create}</span>
            </button>
          </Tooltip>
        </li>
        <li>
          <Tooltip title={t.menu.messenger}>
            <Link href={ProtectedPaths.messenger}>
              {matchesPathname(href, ProtectedPaths.messenger) ? (
                <MessageCircle className={'size-6 text-accent-500'} />
              ) : (
                <MessageCircleOutline className={'size-6'} />
              )}
              <span className={'sr-only'}>{t.menu.messenger}</span>
            </Link>
          </Tooltip>
        </li>
        <li>
          <Tooltip title={t.menu.search}>
            <Link href={ProtectedPaths.search}>
              {matchesPathname(href, ProtectedPaths.search) ? (
                <Search className={'size-6 text-accent-500'} />
              ) : (
                <SearchOutline className={'size-6'} />
              )}
              <span className={'sr-only'}>{t.menu.search}</span>
            </Link>
          </Tooltip>
        </li>
        <li>
          <Tooltip title={t.menu.profile}>
            <NavLink
              active={<Person className={'text-accent-500 size-6'} />}
              href={PathService.generatePath(PublicPaths.userProfile, {
                userId,
              })}
              inactive={<PersonOutline className={'size-6'} />}
              label={t.menu.profile}
            />
          </Tooltip>
        </li>
      </ul>
      <NewPostDialog
        onClose={onNewPostModalClose}
        onOpenChange={onNewPostModalClose}
        open={isNewPostModalOpen}
      />
    </nav>
  )
}

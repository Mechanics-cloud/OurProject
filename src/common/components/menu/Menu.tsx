import React from 'react'

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
import { Paths, useModal, useTranslation } from '@/common'
import { matchesPathname } from '@/common/components/menu/matchesPathname'
import { Tooltip } from '@/common/components/tooltip'
import { NewPostDialog } from '@/features/createPost/ui/NewPostDialog'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Menu = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const href = router.asPath

  const {
    isModalOpen: isNewPostModalOpen,
    onModalClose: onNewPostModalClose,
    openModal: openNewPostModal,
  } = useModal()

  return (
    <nav className={'min-w-[360px] w-full bg-dark-00 border-t border-dark-300'}>
      <ul className={'flex w-full justify-evenly py-[18px]'}>
        <li>
          <Tooltip title={t.menu.home}>
            <Link href={Paths.home}>
              {matchesPathname(href, Paths.home) ? (
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
            <Link href={Paths.messenger}>
              {matchesPathname(href, Paths.messenger) ? (
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
            <Link href={Paths.search}>
              {matchesPathname(href, Paths.search) ? (
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
            <Link href={Paths.profile}>
              {matchesPathname(href, Paths.profile) ? (
                <Person className={'size-6 text-accent-500'} />
              ) : (
                <PersonOutline className={'size-6'} />
              )}
              <span className={'sr-only'}>{t.menu.profile}</span>
            </Link>
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

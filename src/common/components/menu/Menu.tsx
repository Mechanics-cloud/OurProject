import React, { useState } from 'react'

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
import { matchesPathname } from '@/common/components/menu/matchesPathname'
import { Tooltip } from '@/common/components/tooltip'
import useTranslation from '@hooks/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'

const PATHS = {
  HOME: '/',
  MESSENGER: '/messenger',
  PROFILE: '/profile/[[...id]]',
  PUBLICATION: '/publication',
  SEARCH: '/search',
} as const

export const Menu = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const href = router.asPath

  const [isModalOpen, setIsModalOpen] = useState(false)

  if (isModalOpen) {
    setIsModalOpen(false)
    alert('Hey')
  }

  return (
    <nav className={'min-w-[360px] w-full bg-dark-00 border-t border-dark-300'}>
      <ul className={'flex w-full justify-evenly py-[18px]'}>
        <li>
          <Tooltip title={t.menu.home}>
            <Link href={PATHS.HOME}>
              {matchesPathname(href, PATHS.HOME) ? (
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
              onClick={() => {
                setIsModalOpen(true)
              }}
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
            <Link href={PATHS.MESSENGER}>
              {matchesPathname(href, PATHS.MESSENGER) ? (
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
            <Link href={PATHS.SEARCH}>
              {matchesPathname(href, PATHS.SEARCH) ? (
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
            <Link href={PATHS.PROFILE}>
              {matchesPathname(href, PATHS.PROFILE) ? (
                <Person className={'size-6 text-accent-500'} />
              ) : (
                <PersonOutline className={'size-6'} />
              )}
              <span className={'sr-only'}>{t.menu.profile}</span>
            </Link>
          </Tooltip>
        </li>
      </ul>
    </nav>
  )
}

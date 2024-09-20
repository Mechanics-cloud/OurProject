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
import Link from 'next/link'
import { useRouter } from 'next/router'

const PATHS = {
  HOME: '/',
  MESSENGER: '/messenger/*',
  PROFILE: '/profile/*',
  PUBLICATION: '/publication/*',
  SEARCH: '/search/*',
} as const

export type PathsType = (typeof PATHS)[keyof typeof PATHS]

export const Menu = () => {
  const router = useRouter()
  const href = router.pathname
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <nav className={'min-w-[360px] w-full bg-dark-00 border-t border-dark-300'}>
      <ul className={'flex w-full justify-evenly py-[18px]'}>
        <li>
          <Link href={PATHS.HOME}>
            {matchesPathname(href, PATHS.HOME) ? (
              <Home className={'size-6 text-accent-500'} />
            ) : (
              <HomeOutline className={'size-6'} />
            )}
          </Link>
        </li>
        <li className={'group'}>
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
          </button>
        </li>
        <li>
          <Link href={PATHS.MESSENGER}>
            {matchesPathname(href, PATHS.MESSENGER) ? (
              <MessageCircle className={'size-6 text-accent-500'} />
            ) : (
              <MessageCircleOutline className={'size-6'} />
            )}
          </Link>
        </li>
        <li>
          <Link href={PATHS.SEARCH}>
            {matchesPathname(href, PATHS.SEARCH) ? (
              <Search className={'size-6 text-accent-500'} />
            ) : (
              <SearchOutline className={'size-6'} />
            )}
          </Link>
        </li>
        <li>
          <Link href={PATHS.PROFILE}>
            {matchesPathname(href, PATHS.PROFILE) ? (
              <Person className={'size-6 text-accent-500'} />
            ) : (
              <PersonOutline className={'size-6'} />
            )}
          </Link>
        </li>
      </ul>
    </nav>
  )
}

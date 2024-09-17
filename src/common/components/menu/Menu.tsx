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
import { MenuItem } from '@/common/components/menu/MenuItem'
import Link from 'next/link'
import { useRouter } from 'next/router'

const PATHS = {
  HOME: '/',
  MESSENGER: '/messenger',
  PROFILE: '/profile',
  PUBLICATION: '/publication',
  SEARCH: '/search',
} as const

export type PathsType = (typeof PATHS)[keyof typeof PATHS]

const linksForMenu = [
  {
    iconFilled: MessageCircle,
    iconOutlined: MessageCircleOutline,
    path: PATHS.MESSENGER,
  },
  {
    iconFilled: Search,
    iconOutlined: SearchOutline,
    path: PATHS.SEARCH,
  },
  {
    iconFilled: Person,
    iconOutlined: PersonOutline,
    path: PATHS.PROFILE,
  },
]

export const Menu = () => {
  const router = useRouter()
  const path = router.pathname

  return (
    <nav className={'min-w-[360px] w-full bg-dark-00 border-t border-dark-300'}>
      <ul className={'flex w-full justify-evenly py-[18px]'}>
        <li key={'home'}>
          <Link href={PATHS.HOME}>
            {path === PATHS.HOME ? (
              <Home className={'w-6 h-6 text-accent-500'} />
            ) : (
              <HomeOutline className={'w-6 h-6'} />
            )}
          </Link>
        </li>
        <li
          className={'group'}
          key={'publication'}
        >
          <button
            onClick={() => {
              alert('Hey!')
            }}
            type={'button'}
          >
            <PlusSquareOutline
              className={'w-6 h-6 group-hover:hidden group-active:hidden'}
            />
            <PlusSquare
              className={
                'w-6 h-6 hidden group-hover:block group-active:block text-accent-500'
              }
            />
          </button>
        </li>
        {linksForMenu.map((link, index) => (
          <MenuItem
            currentPath={path}
            iconFilled={link.iconFilled}
            iconOutlined={link.iconOutlined}
            key={index}
            path={link.path}
          />
        ))}
      </ul>
    </nav>
  )
}

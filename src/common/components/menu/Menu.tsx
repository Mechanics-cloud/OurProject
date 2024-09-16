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
    iconFilled: Home,
    iconOutlined: HomeOutline,
    path: PATHS.HOME,
  },
  {
    iconFilled: PlusSquare,
    iconOutlined: PlusSquareOutline,
    path: PATHS.PUBLICATION,
  },
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
  const path = String(router.asPath)

  return (
    <nav className={'min-w-[360px] w-full bg-dark-00 border-t border-dark-300'}>
      <ul className={'flex w-full justify-evenly py-[18px]'}>
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

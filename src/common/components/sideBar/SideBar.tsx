import { useState } from 'react'

import {
  Bookmark,
  Home,
  LogOut,
  MessageCircle,
  Person,
  PlusSquare,
  Search,
  TrendingUp,
} from '@/assets/icons/filledIcons'
import {
  BookmarkOutline,
  HomeOutline,
  MessageCircleOutline,
  PersonOutline,
  PlusSquareOutline,
  SearchOutline,
  TrendingUpOutline,
} from '@/assets/icons/outlineIcons'
import { cn } from '@/common/utils/cn'
import Link from 'next/link'
import { useRouter } from 'next/router'

const styles = {
  activeLink: 'text-accent-500 font-bold',
  link: 'flex items-center gap-3 [&_svg]:w-6 [&_svg]:h-6 rounded-sm focus-visible:border-transparent  focus-visible:ring-2 focus-visible:ring-accent-700  focus-visible:outline-none  hover:text-accent-100',
  ul: '[&_li]:mb-6',
}

export const SideBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { pathname } = useRouter()
  const isActive = (path: string) => pathname === path

  const handelCreate = () => {
    setModalIsOpen(true)
  }

  return (
    <aside className={'flex justify-center'}>
      <nav className={'pt-[72px] '}>
        <ul className={`mb-[60px] ${styles.ul}`}>
          <li>
            <Link
              className={cn(styles.link, isActive('/') && styles.activeLink)}
              href={'/'}
            >
              {isActive('/') ? <Home /> : <HomeOutline />}
              Home
            </Link>
          </li>
          <li>
            <button
              className={cn(styles.link, modalIsOpen && styles.activeLink)}
              onClick={handelCreate}
              type={'button'}
            >
              {modalIsOpen ? <PlusSquare /> : <PlusSquareOutline />}
              Create
            </button>
          </li>
          <li>
            <Link
              className={cn(
                styles.link,
                isActive('/profile') && styles.activeLink
              )}
              href={'/profile'}
            >
              {isActive('/profile') ? <Person /> : <PersonOutline />}
              My Profile
            </Link>
          </li>
          <li>
            <Link
              className={cn(
                styles.link,
                isActive('/messenger') && styles.activeLink
              )}
              href={'/messenger'}
            >
              {isActive('/messenger') ? (
                <MessageCircle />
              ) : (
                <MessageCircleOutline />
              )}
              Messenger
            </Link>
          </li>
          <li>
            <Link
              className={cn(styles.link, isActive('/') && styles.activeLink)}
              href={'/'}
            >
              {' '}
              {isActive('/') ? <Search /> : <SearchOutline />}
              Search
            </Link>
          </li>
        </ul>
        <ul className={`mb-[180px] ${styles.ul}`}>
          <li>
            <Link
              className={cn(styles.link, isActive('/') && styles.activeLink)}
              href={'/'}
            >
              {isActive('/') ? <TrendingUp /> : <TrendingUpOutline />}
              Statistics
            </Link>
          </li>
          <li>
            <Link
              className={cn(styles.link, isActive('/') && styles.activeLink)}
              href={'/'}
            >
              {isActive('/') ? <Bookmark /> : <BookmarkOutline />}
              Favorites
            </Link>
          </li>
        </ul>
        <ul className={'mb-9'}>
          <li>
            <button
              className={styles.link}
              type={'button'}
            >
              <LogOut />
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

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
import { LogOutModal } from '@/common/components/logOutModal'

import { NavLink } from './navLink/NavLink'

export const SideBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handelCreate = () => {
    setModalIsOpen(true)
  }

  return (
    <aside
      className={'flex justify-center border-r-2 border-dark-300 min-w-56'}
    >
      <nav className={'pt-[72px] '}>
        <ul className={`mb-[60px] [&_li]:mb-6`}>
          <NavLink
            ActiveIcon={Home}
            DefaultIcon={HomeOutline}
            href={'/'}
          >
            Home
          </NavLink>

          <NavLink
            ActiveIcon={PlusSquare}
            DefaultIcon={PlusSquareOutline}
            as={'button'}
            iconTrigger={modalIsOpen}
            onClick={handelCreate}
          >
            Create
          </NavLink>

          <NavLink
            ActiveIcon={Person}
            DefaultIcon={PersonOutline}
            href={'/profile'}
          >
            My Profile
          </NavLink>

          <NavLink
            ActiveIcon={MessageCircle}
            DefaultIcon={MessageCircleOutline}
            href={'/messenger'}
          >
            Messenger
          </NavLink>

          <NavLink
            ActiveIcon={Search}
            DefaultIcon={SearchOutline}
            href={'/search'}
          >
            Search
          </NavLink>
        </ul>

        <ul className={`mb-[180px] [&_li]:mb-6`}>
          <NavLink
            ActiveIcon={TrendingUp}
            DefaultIcon={TrendingUpOutline}
            href={'/statistics'}
          >
            Statistics
          </NavLink>

          <NavLink
            ActiveIcon={Bookmark}
            DefaultIcon={BookmarkOutline}
            href={'/favorites'}
          >
            Favorites
          </NavLink>
        </ul>

        <ul className={'mb-9'}>
          <LogOutModal
            triggerButton={
              <NavLink
                ActiveIcon={LogOut}
                DefaultIcon={LogOut}
                as={'button'}
              >
                Log Out
              </NavLink>
            }
            yesHandler={() => {
              alert('You are logged out!')
            }}
          />
        </ul>
      </nav>
    </aside>
  )
}

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
import { useTranslation } from '@/common'

import { NavLink } from './navLink/NavLink'

export const SideBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { t } = useTranslation()

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
            {t.menu.home}
          </NavLink>

          <NavLink
            ActiveIcon={PlusSquare}
            DefaultIcon={PlusSquareOutline}
            as={'button'}
            iconTrigger={modalIsOpen}
            onClick={handelCreate}
          >
            {t.menu.create}
          </NavLink>

          <NavLink
            ActiveIcon={Person}
            DefaultIcon={PersonOutline}
            href={'/profile'}
          >
            {t.menu.profile}
          </NavLink>

          <NavLink
            ActiveIcon={MessageCircle}
            DefaultIcon={MessageCircleOutline}
            href={'/messenger'}
          >
            {t.menu.messenger}
          </NavLink>

          <NavLink
            ActiveIcon={Search}
            DefaultIcon={SearchOutline}
            href={'/search'}
          >
            {t.menu.search}
          </NavLink>
        </ul>

        <ul className={`mb-[180px] [&_li]:mb-6`}>
          <NavLink
            ActiveIcon={TrendingUp}
            DefaultIcon={TrendingUpOutline}
            href={'/statistics'}
          >
            {t.menu.statistics}
          </NavLink>

          <NavLink
            ActiveIcon={Bookmark}
            DefaultIcon={BookmarkOutline}
            href={'/favorites'}
          >
            {t.menu.favorites}
          </NavLink>
        </ul>

        <ul className={'mb-9'}>
          <NavLink
            ActiveIcon={LogOut}
            DefaultIcon={LogOut}
            as={'button'}
          >
            {t.menu.logOut}
          </NavLink>
          <LogOutModal
            logOutModalHandler={() => {
              alert('You are logged out!')
            }}
            triggerButton={
              <NavLink
                ActiveIcon={LogOut}
                DefaultIcon={LogOut}
                as={'button'}
              >
                Log Out
              </NavLink>
            }
            userEmail={'__email__'}
          />
        </ul>
      </nav>
    </aside>
  )
}

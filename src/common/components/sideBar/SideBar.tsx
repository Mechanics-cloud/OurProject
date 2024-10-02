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
import { LinkWithIcon, useTranslation } from '@/common'
import { LogOutModal } from '@/common/components/logOutModal'

export const SideBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { t } = useTranslation()

  const handelCreate = () => {
    setModalIsOpen(true)
  }

  return (
    <aside
      className={
        'flex flex-col border-r-2 border-dark-300 min-w-56 fixed h-screen'
      }
    >
      <nav className={'pt-[72px]'}>
        <ul className={`mb-[60px] [&_li]:mb-6`}>
          <li>
            <LinkWithIcon
              ActiveIcon={Home}
              DefaultIcon={HomeOutline}
              href={'/'}
            >
              {t.menu.home}
            </LinkWithIcon>
          </li>

          <li>
            <LinkWithIcon
              ActiveIcon={PlusSquare}
              DefaultIcon={PlusSquareOutline}
              as={'button'}
              iconTrigger={modalIsOpen}
              onClick={handelCreate}
            >
              {t.menu.create}
            </LinkWithIcon>
          </li>

          <li>
            <LinkWithIcon
              ActiveIcon={Person}
              DefaultIcon={PersonOutline}
              href={'/profile'}
            >
              {t.menu.profile}
            </LinkWithIcon>
          </li>

          <li>
            <LinkWithIcon
              ActiveIcon={MessageCircle}
              DefaultIcon={MessageCircleOutline}
              href={'/messenger'}
            >
              {t.menu.messenger}
            </LinkWithIcon>
          </li>

          <li>
            <LinkWithIcon
              ActiveIcon={Search}
              DefaultIcon={SearchOutline}
              href={'/search'}
            >
              {t.menu.search}
            </LinkWithIcon>
          </li>
        </ul>

        <ul className={`mb-[180px] [&_li]:mb-6`}>
          <li>
            <LinkWithIcon
              ActiveIcon={TrendingUp}
              DefaultIcon={TrendingUpOutline}
              href={'/statistics'}
            >
              {t.menu.statistics}
            </LinkWithIcon>
          </li>

          <li>
            <LinkWithIcon
              ActiveIcon={Bookmark}
              DefaultIcon={BookmarkOutline}
              href={'/favorites'}
            >
              {t.menu.favorites}
            </LinkWithIcon>
          </li>
        </ul>

        <ul className={'mb-9'}>
          <LogOutModal
            logOutModalHandler={() => {
              alert('You are logged out!')
            }}
            triggerButton={
              <li>
                <LinkWithIcon
                  ActiveIcon={LogOut}
                  DefaultIcon={LogOut}
                  as={'button'}
                >
                  {t.menu.logOut}
                </LinkWithIcon>
              </li>
            }
            userEmail={'__email__'}
          />
        </ul>
      </nav>
    </aside>
  )
}

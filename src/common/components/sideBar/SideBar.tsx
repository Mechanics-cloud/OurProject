import { generalStore } from '@/app/store'
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
import { Paths, useModal, useTranslation } from '@/common'
import { LogOutModal } from '@/common/components/logOutModal'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import authStore from '@/features/auth/model/authStore'
import { observer } from 'mobx-react-lite'
import Router from 'next/router'

import { NavLink } from './navLink/NavLink'

export const SideBar = observer(() => {
  const { isModalOpen, onModalClose, openModal } = useModal(async () => {
    const isLoadingStore = generalStore

    isLoadingStore.turnOnLoading()
    try {
      await authStore.logout()
      Router.push(Paths.signIn)
    } catch (error: unknown) {
      responseErrorHandler(error)
    } finally {
      isLoadingStore.turnOffLoading()
    }
  })
  const { t } = useTranslation()

  const handelCreate = () => {
    openModal()
  }

  return (
    <aside
      className={
        'flex flex-col border-r-2 border-dark-300 min-w-56 fixed h-screen'
      }
    >
      <nav className={'pt-[72px]'}>
        <ul className={`mb-[60px] [&_li]:mb-6`}>
          <NavLink
            ActiveIcon={Home}
            DefaultIcon={HomeOutline}
            href={'/home'}
          >
            {t.menu.home}
          </NavLink>

          <NavLink
            ActiveIcon={PlusSquare}
            DefaultIcon={PlusSquareOutline}
            as={'button'}
            iconTrigger={isModalOpen}
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
          <LogOutModal
            logOutModalHandler={onModalClose}
            triggerButton={
              <NavLink
                ActiveIcon={LogOut}
                DefaultIcon={LogOut}
                as={'button'}
              >
                {t.menu.logOut}
              </NavLink>
            }
            userEmail={authStore.profile?.email ?? ''}
          />
        </ul>
      </nav>
    </aside>
  )
})

import { ComponentProps } from 'react'

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
import { LinkWithIcon, Paths, cn, useModal, useTranslation } from '@/common'
import { LogOutModal } from '@/common/components/logOutModal'
import { generalStore } from '@/core/store'
import { NewPostDialog } from '@/features/createPost/ui/NewPostDialog'
import { observer } from 'mobx-react-lite'

type Props = ComponentProps<'aside'>

export const SideBar = observer(({ className }: Props) => {
  const { t } = useTranslation()
  const {
    isModalOpen: isLogOutModalOpen,
    onModalClose: onLogOutModalClose,
    openModal: openLogOutModal,
  } = useModal()

  const {
    isModalOpen: isNewPostModalOpen,
    onModalClose: onNewPostModalClose,
    openModal: openNewPostModal,
  } = useModal()

  const userId = generalStore.user?.userId

  return (
    <>
      <aside
        className={cn(
          'hidden lg:block lg:min-w-56 lg:h-headCalc lg:fixed',
          className
        )}
      >
        <nav className={'pt-[72px] h-full'}>
          <ul className={`mb-[60px] [&_li]:mb-4 flex-col flex h-full`}>
            <li>
              <LinkWithIcon
                ActiveIcon={Home}
                DefaultIcon={HomeOutline}
                className={'py-2'}
                href={Paths.home}
              >
                {t.menu.home}
              </LinkWithIcon>
            </li>

            <li>
              <LinkWithIcon
                ActiveIcon={PlusSquare}
                DefaultIcon={PlusSquareOutline}
                as={'button'}
                onClick={openNewPostModal}
              >
                {t.menu.create}
              </LinkWithIcon>
            </li>

            <li>
              <LinkWithIcon
                ActiveIcon={Person}
                DefaultIcon={PersonOutline}
                href={Paths.profileLink(userId)}
              >
                {t.menu.profile}
              </LinkWithIcon>
            </li>

            <li>
              <LinkWithIcon
                ActiveIcon={MessageCircle}
                DefaultIcon={MessageCircleOutline}
                href={Paths.messenger}
              >
                {t.menu.messenger}
              </LinkWithIcon>
            </li>

            <li>
              <LinkWithIcon
                ActiveIcon={Search}
                DefaultIcon={SearchOutline}
                href={Paths.search}
              >
                {t.menu.search}
              </LinkWithIcon>
            </li>

            <li className={'mt-14'}>
              <LinkWithIcon
                ActiveIcon={TrendingUp}
                DefaultIcon={TrendingUpOutline}
                href={Paths.statistics}
              >
                {t.menu.statistics}
              </LinkWithIcon>
            </li>

            <li>
              <LinkWithIcon
                ActiveIcon={Bookmark}
                DefaultIcon={BookmarkOutline}
                href={Paths.favorites}
              >
                {t.menu.favorites}
              </LinkWithIcon>
            </li>

            <li className={'mt-auto pb-4'}>
              <LinkWithIcon
                ActiveIcon={LogOut}
                DefaultIcon={LogOut}
                as={'button'}
                onClick={openLogOutModal}
              >
                {t.menu.logOut}
              </LinkWithIcon>
            </li>
          </ul>
        </nav>
      </aside>

      <LogOutModal
        logOutModalHandler={onLogOutModalClose}
        onClose={onLogOutModalClose}
        open={isLogOutModalOpen}
        userEmail={generalStore.user?.email ?? ''}
      />

      <NewPostDialog
        onClose={onNewPostModalClose}
        onOpenChange={onNewPostModalClose}
        open={isNewPostModalOpen}
      />
    </>
  )
})

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
import {
  LinkWithIcon,
  ProtectedPaths,
  PublicPaths,
  cn,
  useModal,
  useTranslation,
} from '@/common'
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
          'hidden lg:block lg:min-w-56 lg:h-headCalc lg:fixed lg:border-r-2 lg:border-dark-300',
          className
        )}
      >
        <nav className={'h-full'}>
          <ul
            className={cn(
              `[&_li]:mb-4 flex-col flex h-full`,
              "before:content-[''] before:block before:h-16 before:shrink",
              "after:content-[''] after:block after:h-16 after:shrink"
            )}
          >
            <li>
              <LinkWithIcon
                ActiveIcon={Home}
                DefaultIcon={HomeOutline}
                className={'py-2'}
                href={ProtectedPaths.home}
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
                href={PublicPaths.profileLink(userId)}
              >
                {t.menu.profile}
              </LinkWithIcon>
            </li>

            <li>
              <LinkWithIcon
                ActiveIcon={MessageCircle}
                DefaultIcon={MessageCircleOutline}
                href={ProtectedPaths.messenger}
              >
                {t.menu.messenger}
              </LinkWithIcon>
            </li>

            <li>
              <LinkWithIcon
                ActiveIcon={Search}
                DefaultIcon={SearchOutline}
                href={ProtectedPaths.search}
              >
                {t.menu.search}
              </LinkWithIcon>
            </li>

            <span className={'h-14 shrink'}></span>

            <li>
              <LinkWithIcon
                ActiveIcon={TrendingUp}
                DefaultIcon={TrendingUpOutline}
                href={ProtectedPaths.statistics}
              >
                {t.menu.statistics}
              </LinkWithIcon>
            </li>

            <li>
              <LinkWithIcon
                ActiveIcon={Bookmark}
                DefaultIcon={BookmarkOutline}
                href={ProtectedPaths.favorites}
              >
                {t.menu.favorites}
              </LinkWithIcon>
            </li>

            <li className={'mt-auto'}>
              <LinkWithIcon
                ActiveIcon={LogOut}
                DefaultIcon={LogOut}
                as={'button'}
                onClick={openLogOutModal}
              >
                {t.basic.logOut}
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

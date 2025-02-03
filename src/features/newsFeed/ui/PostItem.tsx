import React from 'react'

import {
  BasicPost,
  PathService,
  PublicPaths,
  TextUnfolding,
  Typography,
  UserMiniLink,
  calculateCharactersToShow,
  timeAgo,
  useTranslation,
} from '@/common'
import { Stub } from '@/common/components/stub/Stub'
import { CustomSwiper } from '@/common/components/swiper'
import {
  AvatarGroupWithLikes,
  CustomNewsFeedPopover,
} from '@/features/newsFeed'
import Link from 'next/link'
import { NextRouter } from 'next/router'
import avatarPlaceholder from 'src/assets/images/user-avatar-placeholder.jpg'

import { WrapperParentComponent } from '../model/wrapperParentComponent'
import { LinkProfile } from './LinkProfile'
import { LinksGroup } from './LinksGroup'

type Props = {
  item: BasicPost
  router: NextRouter
}

const PostItem = ({ item, router }: Props) => {
  const { t } = useTranslation()

  return (
    <div
      className={
        'max-w-[491px] border-b sm:mt-[24px] sm:ml-[8%] mb-[56px] flex flex-col pb-2 justify-between'
      }
    >
      <div
        className={
          'w-full h-9 mb-3 flex  items-center justify-between relative'
        }
      >
        <span className={'flex  items-center space-x-2'}>
          <UserMiniLink
            href={PublicPaths.profileLink(item.ownerId)}
            name={item.userName}
            src={item.avatarOwner ? item.avatarOwner : avatarPlaceholder}
          />
          <span
            className={'size-1 bg-light-100 rounded-full relative top-[1px]'}
          ></span>
          <Typography
            className={'text-light-900 h-[20px] flex items-end'}
            variant={'small'}
          >
            {timeAgo(item.updatedAt, router.locale)}
          </Typography>
        </span>
        <CustomNewsFeedPopover />
      </div>
      <Link
        href={PathService.generatePath(PublicPaths.userPost, {
          postId: item.id,
          userId: item.ownerId,
        })}
      >
        <section
          className={'relative w-full aspect-square overflow-hidden mb-3'}
        >
          {item.images.length > 0 ? (
            <CustomSwiper images={item.images} />
          ) : (
            <Stub
              alt={t.profilePage.noPosts.alt}
              title={t.basic.errors.emptyImages}
            />
          )}
        </section>
      </Link>
      <LinksGroup
        className={'mb-4'}
        item={item}
      />
      <AvatarGroupWithLikes item={item} />
      {item.description && (
        <TextUnfolding
          charactersToShow={calculateCharactersToShow(170, item.userName)}
          className={'text-justify break-words'}
          link={
            <span className={'mr-2 inline-block'}>
              <LinkProfile
                userId={item.ownerId}
                userName={item.userName}
              />
            </span>
          }
        >
          {item.description}
        </TextUnfolding>
      )}
      <WrapperParentComponent postId={item.id} />
    </div>
  )
}

export default PostItem

import React from 'react'

import {
  Paths,
  TextUnfolding,
  Typography,
  UserMiniLink,
  calculateCharactersToShow,
  timeAgo,
  useTranslation,
} from '@/common'
import { CustomSwiper } from '@/common/components/swiper'
import Image from 'next/image'
import { NextRouter } from 'next/router'
import avatarPlaceholder from 'src/assets/images/user-avatar-placeholder.jpg'

import { Post } from '../model'
import { WrapperParentComponent } from '../model/wrapperParentComponent'
import { AvatarGroupWithLikes } from './AvatarGroupWithLikes'
import { CustomNewsFeedPopover } from './CustomNewsFeedPopover'
import { LinkProfile } from './LinkProfile'
import { LinksGroup } from './LinksGroup'

type Props = {
  item: Post
  router: NextRouter
}

const PostItem = ({ item, router }: Props) => {
  const { t } = useTranslation()

  return (
    <div
      className={
        'w-[491px] min-h-[816px] border-b mt-[24px] ml-[8%] mb-[56px] flex flex-col pb-2 justify-between'
      }
    >
      <div className={'w-full h-9 mb-3 flex  items-center justify-between'}>
        <span className={'flex  items-center space-x-2'}>
          <UserMiniLink
            avatarSrc={item.avatarOwner ? item.avatarOwner : avatarPlaceholder}
            name={item.userName}
            profileLink={`${Paths.profileLink(item.ownerId)}`}
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
      <section className={'h-[504px] mb-3'}>
        {item.images.length > 0 ? (
          <CustomSwiper images={item.images} />
        ) : (
          t.slider.noText
        )}
      </section>
      <LinksGroup item={item} />
      <div className={'w-full inline-flex gap-3'}>
        <div className={'min-w-[36px] flex items-center pb-6'}>
          <Image
            alt={'Avatar'}
            className={'size-9 rounded-full'}
            height={36}
            src={item.avatarOwner ? item.avatarOwner : avatarPlaceholder}
            width={36}
          />
        </div>
        <TextUnfolding
          charactersToShow={calculateCharactersToShow(
            item.description,
            item.userName
          )}
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
      </div>
      <AvatarGroupWithLikes item={item} />
      <WrapperParentComponent postId={item.id} />
    </div>
  )
}

export default PostItem

import {
  PathService,
  PublicPaths,
  TextUnfolding,
  calculateCharactersToShow,
  useTranslation,
} from '@/common'
import { Stub } from '@/common/components/stub/Stub'
import {
  LinkProfile,
  PublicPostsDto,
  RegisteredUsersCounter,
  TimeAgo,
} from '@/features/publicPosts'
import Link from 'next/link'
import CustomSwiper from 'src/common/components/swiper/CustomSwiper'

import 'swiper/swiper-bundle.css'

type Props = {
  posts: PublicPostsDto
}
export const PublicPosts = ({ posts }: Props) => {
  const { t } = useTranslation()

  return (
    <div
      className={'w-full flex flex-col justify-center items-center pt-6 gap-9'}
    >
      <RegisteredUsersCounter totalUsers={posts.totalUsers} />
      <div
        className={
          'max-w-[996px] w-full grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-3'
        }
      >
        {posts.items.map((post) => {
          return (
            <div
              className={'flex flex-col gap-3'}
              key={post.id}
            >
              <div className={'relative h-60 w-full'}>
                {post.images.length > 0 ? (
                  <Link
                    href={PathService.generatePath(PublicPaths.userPost, {
                      postId: post.id,
                      userId: post.ownerId,
                    })}
                  >
                    <CustomSwiper
                      className={
                        'publicPost swiper-nav-top-55 swiper-nav-small swiper-btn-bg-small swiper-pagination-bottom-8 swiper-bullet-small'
                      }
                      images={post.images}
                    />
                  </Link>
                ) : (
                  <Stub
                    alt={t.profilePage.noPosts.alt}
                    title={t.basic.errors.emptyImages}
                  />
                )}
              </div>
              <div className={'w-60 flex flex-col gap-2'}>
                <LinkProfile
                  avatarOwner={post.avatarOwner}
                  userId={post.ownerId}
                  userName={post.userName}
                />
                <TimeAgo createdAt={post.createdAt} />
                <TextUnfolding
                  charactersToShow={calculateCharactersToShow(
                    85,
                    post.userName
                  )}
                >
                  {post.description}
                </TextUnfolding>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

import {
  PathService,
  Paths,
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
      className={'w-full flex flex-col justify-start items-center pt-6 gap-9'}
    >
      <RegisteredUsersCounter totalUsers={posts.totalUsers} />
      <div
        className={
          'grid xl:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-3'
        }
      >
        {posts.items.map((post) => {
          return (
            <div
              className={'flex flex-col gap-3'}
              key={post.id}
            >
              <div className={'relative w-60 h-60 lg:w-full xl:w-60'}>
                {post.images.length > 0 ? (
                    <Link
                      href={PathService.generatePath(Paths.publicMainPagePost, {
                        postId: post.id,
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

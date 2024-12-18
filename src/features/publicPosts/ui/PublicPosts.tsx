import { TextUnfolding, calculateCharactersToShow } from '@/common'
import {
  LinkProfile,
  PublicPostsDto,
  RegisteredUsersCounter,
  TimeAgo,
} from '@/features/publicPosts'
import CustomSwiper from 'src/common/components/swiper/CustomSwiper'

import 'swiper/swiper-bundle.css'

type Props = {
  posts: PublicPostsDto
}
export const PublicPosts = ({ posts }: Props) => {
  return (
    <div
      className={
        'w-full flex flex-col justify-start items-center h-headCalc pt-6 gap-9'
      }
    >
      <RegisteredUsersCounter totalUsers={posts.totalUsers} />
      <div className={'flex justify-center gap-3'}>
        {posts.items.map((post) => {
          return (
            <div
              className={'flex flex-col gap-3'}
              key={post.id}
            >
              <div className={'relative w-60 h-60'}>
                <CustomSwiper
                  className={'publicPost'}
                  images={post.images}
                />
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

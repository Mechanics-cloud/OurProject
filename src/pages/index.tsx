import { Typography } from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import {
  PublicPostsDto,
  RegisteredUsersCounter,
  publicPostsApi,
} from '@/features/publicPosts'
import { GetStaticPropsResult, InferGetStaticPropsType } from 'next'

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ posts: PublicPostsDto }>
> {
  const posts = await publicPostsApi.fetchPublicPosts({
    pageSize: 4,
    sortDirection: 'desc',
  })

  if (!posts) {
    return {
      notFound: true,
    }
  }

  return { props: { posts }, revalidate: 60 }
}

function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={'flex flex-col justify-start w-full h-headCalc pt-6'}>
      <RegisteredUsersCounter totalUsers={props.posts.totalUsers} />
    </div>
  )
}

export default withProtection(Home, true)

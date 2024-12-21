import { withServerSide } from '@/common'
import { PublicPostsDto, publicPostsApi } from '@/features/publicPosts'
import { PublicPosts } from '@/features/publicPosts/ui/PublicPosts'
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

function PublicPostsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const publicPosts = props.posts

  return <PublicPosts posts={publicPosts} />
}

export default withServerSide(PublicPostsPage)

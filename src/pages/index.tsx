import { withProtection } from '@/common/HOC/withProtection'
import { Button } from '@/common/components/button'
import { typographyVariants } from '@/common/components/typography'
import { DeletePostModal, postsStore } from '@/features/profile/posts'
import Link from 'next/link'

function Home() {
  const onDeletePost = async (postId: number) => {
    await postsStore.deletePost(postId)
  }

  return (
    <div className={'flex flex-col justify-center items-center gap-5'}>
      <Button
        asChild
        className={typographyVariants({ variant: 'h3' })}
      >
        <Link href={'/profile'}>profile</Link>
      </Button>
      <Button
        asChild
        className={typographyVariants({ variant: 'h3' })}
      >
        <Link href={'/publication'}>publication</Link>
      </Button>

      <DeletePostModal
        onDeletePost={onDeletePost}
        postId={3368}
      >
        <Button>Delete Post</Button>
      </DeletePostModal>
    </div>
  )
}

export default withProtection(Home, true)

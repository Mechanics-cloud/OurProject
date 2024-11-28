import { withServerSide } from '@/common'
import { Button } from '@/common/components/button'
import { typographyVariants } from '@/common/components/typography'
import axios from 'axios'
import Link from 'next/link'

export async function getServerSideProps() {
  const fetchAllPosts = await axios.get(
    'https://inctagram.work/api/v1/public-posts/all'
  )
  const allPostsData = await fetchAllPosts.data

  return { props: { allPostsData } }
}

function Home(data: any) {
  return (
    <div
      className={
        'flex flex-col justify-center items-center gap-5 w-full h-headCalc'
      }
    >
      <span className={'flex justify-center items-center text-5xl'}>
        total users {data.allPostsData.totalUsers}
      </span>
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
    </div>
  )
}

export default withServerSide(Home)

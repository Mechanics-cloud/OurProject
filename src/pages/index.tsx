import { Button } from '@/common/components/button'
import { SideBar } from '@/common/components/sideBar/SideBar'
import { typographyVariants } from '@/common/components/typography'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={'flex justify-center items-center h-screen'}>
      <SideBar />

      <Button
        asChild
        className={typographyVariants({ variant: 'h3' })}
      >
        <Link href={'/'}>test1</Link>
      </Button>
    </div>
  )
}

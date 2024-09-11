import { Inter } from 'next/font/google'
import { Button } from '@/common/components/button'
import Link from 'next/link'
import { typographyVariants } from '@/common/components/typography'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <div className={'flex justify-center items-center h-screen'}>
      <Button asChild className={typographyVariants({variant:'h3'})}><Link href={'/'}>test1</Link></Button>
    </div>
  )
}

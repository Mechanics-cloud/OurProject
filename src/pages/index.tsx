import { Button } from '@/common/components/button'
import { typographyVariants } from '@/common/components/typography'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })
const a = [
  { id: 'one', label: 'ONE' },
  { id: 'two', label: 'TWO' },
  { id: 'three', label: 'THREE' },
]

export default function Home() {
  return (
    <div className={'flex justify-center items-center h-screen'}>
      <Button
        asChild
        className={typographyVariants({ variant: 'h3' })}
      >
        <Link href={'/'}>test1</Link>
      </Button>
    </div>
  )
}

import { Button } from '@/common/components/button'
import { Menu } from '@/common/components/menu'
import { typographyVariants } from '@/common/components/typography'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={'flex flex-col justify-center items-center h-screen'}>
      <Button
        asChild
        className={typographyVariants({ variant: 'h3' })}
      >
        <Link href={'/'}>test1</Link>
      </Button>
      <Menu />
    </div>
  )
}

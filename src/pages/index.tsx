import { LangSelect } from '@/common'
import { Button } from '@/common/components/button'
import { typographyVariants } from '@/common/components/typography'
import { en } from 'locales/en'
import { ru } from 'locales/ru'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home() {
  return (
    <div className={'flex flex-col justify-center items-center gap-5 h-screen'}>
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

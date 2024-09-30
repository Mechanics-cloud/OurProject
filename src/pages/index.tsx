import { Button } from '@/common/components/button'
import { typographyVariants } from '@/common/components/typography'
import { SignIn } from '@/features/auth/signIn/SignIn'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={'flex flex-col justify-center items-center gap-5 h-full'}>
      <SignIn />
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

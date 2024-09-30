import { Menu } from '@/common'
import { Button } from '@/common/components/button'
import { typographyVariants } from '@/common/components/typography'
import SignUp from '@/pages/auth/sign-up'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={'flex flex-col justify-center items-center gap-5 h-full'}>
      <SignUp />
    </div>
  )
}

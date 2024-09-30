import { Loader, Menu } from '@/common'
import SignUp from '@/pages/auth/sign-up'

export default function Home() {
  return (
    <div className={'flex flex-col justify-center items-center gap-5 h-full'}>
      <Menu />
      <SignUp />
    </div>
  )
}

import { generalStore } from '@/app/store'
import { Loader, getBaseLayout } from '@/common'
import { SignUpForm } from '@/features/auth'

const SignUp = () => {
  const { isLoading } = generalStore

  return (
    <div
      className={
        'md:mt-[24px] mt-4 md:w-[378px] mx-auto box-border border-transparent'
      }
    >
      {isLoading && <Loader />}
      <SignUpForm />
    </div>
  )
}

SignUp.getLayout = getBaseLayout

export default SignUp

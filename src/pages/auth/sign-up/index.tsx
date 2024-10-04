import { getBaseLayout } from '@/common'
import { SignUpForm } from '@/features/auth'

const SignUp = () => {
  return (
    <div
      className={
        'md:mt-[24px] mt-4 md:w-[378px] mx-auto box-border border-transparent'
      }
    >
      <SignUpForm />
    </div>
  )
}

SignUp.getLayout = getBaseLayout

export default SignUp
